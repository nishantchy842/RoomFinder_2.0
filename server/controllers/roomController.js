const roomModel = require("../models/roomModel");
const userModel = require("../models/userModel");
const moment = require("moment");
const { format } = require("date-fns");

exports.createRoom = async (req, res) => {
  try {
    const reqFiles = [];
    const url = req.protocol + "://" + req.get("host");
    for (let i = 0; i < req.files.length; i++) {
      reqFiles.push(url + "/uploads/" + req.files[i].filename);
    }
    const { id: uid, uName, uPhoto, uPhone, uEmail } = req.user;
    const newRoom = new roomModel({
      ...req.body,
      img_collection: reqFiles,
      uid,
      uName,
      uPhoto,
      uPhone,
      uEmail,
    });
    await newRoom.save();
    res.status(201).send({
      success: true,
      message: "Your Room Created",
      result: newRoom,
    });
  } catch (error) {
    console.log(error, "create room");
    res.status(500).send({
      success: false,
      message: "Failed to create room",
    });
  }
};

//get all room

exports.getRoom = async (req, res) => {
  try {
    const rooms = await roomModel.find({}).sort({ title: 1 });

    res.status(200).send({
      success: true,
      counTotal: rooms.length,
      message: "Get all room",
      rooms,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "error in getting room",
    });
  }
};
//get all rooms of specific users

exports.getUserRooms = async (req, res) => {
  try {
    const userId = req.params.uid;
    const rooms = await roomModel
      .find({ uid: userId })
      .select("-photo")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "Rooms Fetched",
      rooms,
    });
  } catch (error) {
    console.log(error, "from getUserRooms Controller");
    res.status(500).send({
      success: false,
      message: "Error while getting Rooms",
    });
  }
};

//delete Room controller

exports.deleteRoom = async (req, res) => {
  try {
    const { id: uid } = req.user;
    const roomId = req.params.rid;
    //rid =  room id
    const room = await roomModel.findById(roomId);

    if (!room || room.id !== roomId) {
      return res.status(500).send({
        success: false,
        message: "Access denied. You are not authorized to delete this room.",
      });
    }
    await roomModel.findByIdAndDelete(roomId);
    res.status(200).send({
      success: true,
      message: "Room deleted successfully.",
      room,
    });
  } catch (error) {
    console.log(error, "delete controller");
    res.status(500).send({
      success: false,
      message: "Failed to delete",
    });
  }
};

//get single room
exports.getSingleRoom = async (req, res) => {
  try {
    const room = await roomModel.findById(req.params.rid);
    res.status(200).send({
      success: true,
      message: "get room success",
      room,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to get room",
    });
  }
};

// update room

exports.updateRoom = async (req, res) => {
  try {
    const reqFiles = [];
    const url = req.protocol + "://" + req.get("host");
    for (let i = 0; i < req.files.length; i++) {
      reqFiles.push(url + "/uploads/" + req.files[i].filename);
    }
    const { id } = req.user; //user id
    const roomId = req.params.rid;
    const room = await roomModel.findById(roomId);
    if (!room || room.uid !== id) {
      return res.status(403).send({
        success: false,
        message: "Access denied. You are not authorized to update this room.",
      });
    }
    room.img_collection = reqFiles;
    Object.assign(room, req.body); // Merge properties from req.body
    const updatedRoom = await room.save();

    await updatedRoom.save();
    res.status(200).send({
      success: true,
      message: "Room Updated SuccessFully",
      updatedRoom,
    });
  } catch (error) {
    console.log(error, "update error");
    res.status(500).send({
      success: true,
      message: "Error While Upadating Room",
    });
  }
};

//search room

exports.searchRoom = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await roomModel.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { amenities: { $regex: keyword, $options: "i" } },
        { address: { $regex: keyword, $options: "i" } },
      ],
    });
    res.send({ resutls });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// product list base on page
exports.productListController = async (req, res) => {
  try {
    const page = req.params.page ? req.params.page : 1;
    let totalItem = await roomModel.find().count();
    if (totalItem % req.query.size != 0) {
      totalItem = Math.ceil(totalItem / req.query.size);
    } else {
      totalItem = totalItem / req.query.size;
    }
    const rooms = await roomModel
      .find()
      .skip((page - 1) * req.query.size)
      .limit(req.query.size)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      rooms,
      totalItem,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// similar products
exports.realtedProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    const rooms = await roomModel
      .find({
        // category: cid,
        _id: { $ne: pid },
      })
      // .select("-img_collection")
      .limit(3);
    // .populate("category");
    res.status(200).send({
      success: true,
      rooms,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// filters
exports.productFiltersController = async (req, res) => {
  try {
    const { place } = req.params;
    const products = await roomModel.find({ place });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

// get unique place name
exports.placeName = async (req, res) => {
  try {
    roomModel.distinct("place").then((uniquePlaces) => {
      // 'uniquePlaces' will contain an array of unique place names
      uniquePlaces.sort();
      res.status(200).send({
        success: true,
        message: "get place successfull",
        uniquePlaces,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "failed to get place name",
    });
  }
};

exports.filterByPrice = async (req, res) => {
  try {
    const { radio } = req.body;
    let args = {};
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const rooms = await roomModel.find(args);
    res.status(200).send({
      success: true,
      rooms,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "filter failed",
    });
  }
};

//Request rooms
exports.requestRoom = async (req, res) => {
  try {
    const { user, room } = req.body;

    const roomDetails = await roomModel.findOne({ _id: room._id });
    const userDetails = await userModel.findOne({ _id: user._id });

    // Check if the user ID already exists in appliedCandidates
    const existingCandidate = roomDetails.appliedCandidates.find(
      (candidate) => candidate.userid === user._id
    );

    if (existingCandidate) {
      return res.send({
        success: false,
        message: "You have already requested this room",
      });
    }

    const appliedCandidate = {
      userid: user._id,
      userName: user.name,
      userPhone: user.phone,
      userEmail: user.email,
      appliedDate: moment().format("MMM DD yyyy"),
    };
    roomDetails.appliedCandidates.push(appliedCandidate);

    await roomDetails.save();

    const appliedRoom = {
      roomid: room._id,
      roomPrice: room.price,
      roomUname: room.uName,
      roomUphone: room.uPhone,
      roomUphoto: room.uPhoto,
      appliedDate: moment().format("MMM DD yyyy"),
    };

    userDetails.appliedRooms.push(appliedRoom);

    await userDetails.save();

    res.send({
      success: true,
      message: "Room Requested successfully",
      roomDetails,
      userDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Request for Rent Failed",
    });
  }
};

// total room count
exports.totalRoom = async (req, res) => {
  try {
    const totalRoom = await roomModel.estimatedDocumentCount();
    res.send({
      totalRoom,
    });
  } catch (error) {
    console.log(error);
  }
};
//recent added room
exports.recentRooms = async (req, res) => {
  try {
    const recentRoom = await roomModel.find().sort({ createdAt: -1 }).limit(4);
    res.status(200).send({
      success: true,
      message: "Recent users",
      recentRoom,
    });
  } catch (error) {
    console.log(error);
    res.send("no users found");
  }
};

//sort

exports.getSortRoom = async (req, res) => {
  try {
    const rooms = await roomModel.find({}).sort({ createdAt: -1 }); // Sort by createdAt field in ascending order and name field in ascending order

    const formattedRooms = rooms.map((room) => ({
      ...room._doc,
      createdAt: format(room.createdAt, "yyyy-MM-dd HH:mm:ss"), // Format createdAt date
    }));

    res.status(200).send({
      success: true,
      countTotal: rooms.length,
      message: "Get all rooms",
      rooms: formattedRooms,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in getting rooms",
    });
  }
};

exports.bookedRoonController = async (req, res) => {
  try {
    const room = await roomModel.findById(req.params.id);
    if (!room) {
      return res.status(404).send({
        success: false,
        message: "Room not found",
      });
    }

    room.status = !room.status;
    await room.save();

    res.status(200).send({
      success: true,
      message: "your room is occupied",
      status: room.status,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "booked failed",
      error,
    });
  }
};
