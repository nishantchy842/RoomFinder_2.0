const roomModel = require('../models/roomModel')

exports.createRoom = async (req, res) => {
  try {

    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host');
    for (let i = 0; i < req.files.length; i++) {
      reqFiles.push(url + '/uploads/' + req.files[i].filename);
    }
    const { id: uid, uName, uPhoto } = req.user;
    console.log(req.user)
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
    // const { id: uid } = req.user
    const roomId = req.params.rid      //rid =  room id

    const room = await roomModel.findByIdAndDelete(roomId);
    res.status(200).send({
      success: true,
      message: 'Successfully Deleted'
    })

  } catch (error) {
    console.log(error, "delete controller")
    res.status(500).send({
      success: false,
      message: "Failed to delete"
    })
  }
}