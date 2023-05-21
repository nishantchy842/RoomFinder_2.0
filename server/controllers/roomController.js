const roomModel = require('../models/roomModel')

exports.createRoom = async (req, res) => {
  try {

    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host');
    for (let i = 0; i < req.files.length; i++) {
      reqFiles.push(url + '/uploads/' + req.files[i].filename);
    }
    const { id: uid, uName, uPhoto } = req.user;
    const newRoom = new roomModel({ ...req.body, img_collection: reqFiles, uid, uName, uPhoto })
    await newRoom.save();
    res.status(201).send({
      success: true,
      message: 'Your Room Created',
      result: newRoom
    });
  } catch (error) {
    console.log(error, 'create room')
    res.status(500).send({
      success: false,
      message: "Failed to create room"
    })
  }
}

//get all room

exports.getRoom = async (req, res) => {
  try {
    const rooms = await roomModel
      .find({})
      .select("-photo")
      .sort({ createdAt: -1 });


    res.status(200).send({
      success: true,
      counTotal: rooms.length,
      message: "Get all room",
      rooms
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error: error.message,
      message: "error in getting room"
    })
  }
}
//get all rooms of specific users

exports.getUserRooms = async (req, res) => {
  try {
    const userId = req.params.uid;
    const rooms = await roomModel.find({ uid: userId }).select("-photo");

    res.status(200).send({
      success: true,
      message: "Rooms Fetched",
      rooms,
    });
  } catch (error) {
    console.log(error, "from getUserRooms Controller")
    res.status(500).send({
      success: false,
      message: "Error while getting Rooms"
    })
  }
}

//delete Room controller

exports.deleteRoom = async (req, res) => {
  try {
    const { id: uid } = req.user
    const roomId = req.params.rid
    //rid =  room id
    const room = await roomModel.findById(roomId)

    if (!room || room.id !== roomId) {
      return res.status(500).send({
        success: false,
        message: "Access denied. You are not authorized to delete this room."
      })
    }
    await roomModel.findByIdAndDelete(roomId);
    res.status(200).send({
      success: true,
      message: 'Room deleted successfully.',
      room
    })

  } catch (error) {
    console.log(error, "delete controller")
    res.status(500).send({
      success: false,
      message: "Failed to delete"
    })
  }
}

//get single room
exports.getSingleRoom = async (req,res)=>{
  try{
      const room = await roomModel.findById(req.params.rid)
      res.status(200).send({
        success:true,
        message:"get room success",
        room
      })
  }catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Failed to get room"
    })
  }
}

// update room

exports.updateRoom = async (req, res) => {
  try {
    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host');
    for (let i = 0; i < req.files.length; i++) {
      reqFiles.push(url + '/uploads/' + req.files[i].filename);
    }
    const { id } = req.user; //user id
    const roomId = req.params.rid
    const room = await roomModel.findById(roomId)
    if (!room || room.uid !== id) {
      return res.status(403).send({
        success: false,
        message: "Access denied. You are not authorized to update this room."
      })
    }
    room.img_collection = reqFiles;
    Object.assign(room, req.body); // Merge properties from req.body
    const updatedRoom = await room.save();

    await updatedRoom.save()
    res.status(200).send({
      success: true,
      message: "Room Updated SuccessFully",
      updatedRoom
    })
  } catch (error) {
    console.log(error, "update error")
    res.status(500).send({
      success: true,
      message: "Error While Upadating Room"
    })
  }
}