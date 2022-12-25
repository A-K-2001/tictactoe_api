const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute =require("./routes/auth");
const gameRoute =require("./routes/game");


const movesRoute =require("./routes/moves");


const cors = require("cors")

dotenv.config();
app.use(cors())



mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DBconnection successful"))
    .catch((err) => {
        console.log(err);
    });

    app.use(express.json());

app.get("/api/test",()=>{
    console.log("test yes");
});    

app.use("/api/auth",authRoute);
app.use("/api/game",gameRoute);
app.use("/api/moves",movesRoute);




app.listen(process.env.PORT || 5000, () => {
    console.log("backend server at 5000");
})