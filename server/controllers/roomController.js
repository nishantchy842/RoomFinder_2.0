const roomModel = require('../models/roomModel')

exports.createRoom = async (req, res) => {
    try {
        const newRoom = new roomModel({ ...req.body })
        await newRoom.save();
        res.status(201).send({
             success: true, 
             message:'Your Room Created',
             result: newRoom });
    } catch (error) {
        console.log(error, 'create room')
        res.status(500).send({
            success: false,
            message: "Failed to create room"
        })
    }
}