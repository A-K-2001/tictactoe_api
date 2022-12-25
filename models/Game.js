const { timeStamp } = require("console");
const mongoose = require("mongoose");



const GameSchema = new mongoose.Schema(

    {
        user1 : {type:String , required:true},
        user2 : {type:String , required:true},
   
    },{timestamps:true}
);

module.exports = mongoose.model("Game",GameSchema);