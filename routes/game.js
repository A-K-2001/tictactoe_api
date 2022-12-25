const Game = require("../models/Game");
const Moves = require("../models/Moves");


const router = require ("express").Router();


// create

router.post("/"  ,async (req,res)=>{

    const newgame = new Game(req.body)

    try{

        const savedgame = await newgame.save();
        console.log(savedgame);

        const newMove = new Moves({gameId:savedgame._id,user:savedgame.user1,moves:[0,0,0,0,0,0,0,0,0],turn:1});
        // console.log(newMove);
        const move = await newMove.save();
        // console.log(move);

        res.status(200).json(savedgame);

    }catch(err){
        // console.log(err); 
        res.status(500).json(err);
    }
})


// get

router.get("/find/:id", async (req,res)=>{

    const quser = req.query.user;

    try{

            let games;
          
                games = await Game.find( { $or: [{ "user1":[req.params.id]},
                    {"user2":[req.params.id]}]});
         
          
            res.status(200).json(games);

    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router