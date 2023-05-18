const roomModel = require('../models/roomModel')

exports.createRoom = async (req, res) => {
  try {

    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host');
    for (let i = 0; i < req.files.length; i++) {
      reqFiles.push(url + '/uploads/' + req.files[i].filename);
    }
    const { id: uid, uName } = req.user;
    console.log(req.user)
    const newRoom = new roomModel({ ...req.body, img_collection: reqFiles, uid, uName, })
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