
const Moves = require("../models/Moves");


const router = require ("express").Router();


// create

router.post("/" ,async (req,res)=>{

    const newMoves = new Moves(req.body)
    
    try{

        const savedMoves = await newMoves.save();
        res.status(200).json(savedMoves);

    }catch(err){ 
        res.status(500).json(err);
    }
})

// // update

router.put("/:id",async (req,res)=>{
   
    try{
        // console.log("yes");
        const updatedMoves = await Moves.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{upsert: true,new:true}
        );
        // console.log(updatedMoves); 


        res.status(200).json(updatedMoves);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});
// get

router.get("/find/:gameId",async (req,res)=>{

    try{
        // console.log(req.params.gameId);
        const moves = await Moves.findOne({gameId:req.params.gameId});
        // console.log("here",moves);
            res.status(200).json(moves);

    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})


router.get("/findm/:id",async (req,res)=>{
    try{
            const  moves = await Moves.findById(req.params.id);
           
            res.status(200).json(moves);
    }catch(err){
        res.status(500).json(err);
    }
});



module.exports = router