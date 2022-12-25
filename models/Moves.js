const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { stringify } = require("querystring");



const MovesSchema = new mongoose.Schema(

    {
        gameId:{ type: String, required: true},
        user:{type:String, required:true},
        moves:{ type:Array ,required:true},
        turn:{type:Number ,required:true}
       
    },{timestamps:true}
);
const Moves = mongoose.model("Moves",MovesSchema);

module.exports = Moves;