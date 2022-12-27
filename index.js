const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute =require("./routes/auth");
const gameRoute =require("./routes/game");


const movesRoute =require("./routes/moves");


const cors = require("cors");
const { Socket } = require("socket.io");

dotenv.config();
app.use(cors())



// SCOKET IO
const server = require('http').createServer(app);

const io = require("socket.io")(server,{
    cors:{
        // origin : "http://localhost:3000",
        origin : "*",
        credentials: true
    },
});
let users = [];
const adduser = (userId, SocketId)=>{
    !users.some((user)=>user.userId===userId)&&
    users.push({userId,SocketId});
};
const removeUser = (SocketId)=>{
    users = users.filter(user=>user.SocketId !== SocketId);
};

const getUsers = (userId)=>{
    return users.find(user=>user.userId === userId);
};

io.on("connection",(Socket)=>{
    // console.log("user connectd");

    Socket.on("adduser", (userId)=>{
        adduser(userId, Socket.id);
        io.emit("getUsers",users);
    });


    Socket.on("sendMessage",({senderId,receiverId,turn,moves})=>{
        const user = getUsers(receiverId);
        io.to(user?.SocketId).emit("getMessage",{
            senderId,
            turn,
            moves,
        });
    });
  
    Socket.on("disconnect",()=>{
        // console.log("user disconnected");
        removeUser(Socket.id);
        io.emit("getUsers",users);
  
    });    

});






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




server.listen(process.env.PORT || 5000, () => {
    console.log("backend server at 5000");
})