const mongoose = require('mongoose')


const connectDb = async () =>{
    try{
        const data = mongoose.connect('mongodb://localhost:27017/RoomFinder')
        if(data){
            console.log('Database is successfull connected')
        }
    }catch(error){
        console.log("Data base is not connected", error)
    }
}

module.exports = connectDb