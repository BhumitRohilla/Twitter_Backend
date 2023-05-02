require("dotenv").config();
const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
    },
});

//Middlewaer
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static("Uploads"));
app.use(
    cors({
        origin: `http://${process.env.HOSTNAME}:${process.env.FRONTEND_PORT}`,
        credentials: true,
    })
);

//Router
const auth = require("./Router/auth");
const tweet = require("./Router/tweet");
const user = require("./Router/user");
const check = require("./Router/check");

//Middleware

const { authorize } = require("./Middleware/authrization");

///(^|(?<=\s))@\w+/g;

//TODO:- Implement Signup function


global.onlineUser = new Map();

io.on("connection", (socket) => {
    socket.on('add-user',(data)=>{
        console.log('user added',data,socket.id);
        global.onlineUser.set(data,socket.id);
    })
    socket.on('disconnet',(data)=>{
        console.log('user removed',data);
        global.onlineUser.delete(data);
    })
    socket.on('send-message',({message,receiver,sender})=>{
        let id = global.onlineUser.get(receiver);
        console.log(message,receiver,sender,id);
        if(id){
            io.to(id).emit('recieve-message',{message,sender});
        }
    })
});

app.use("/auth", auth);

app.use("/tweet", tweet);

app.use("/user", authorize, user);

app.use("/check", check);

app.route("*")
    .get((req, res) => {
        res.status(404).json({ err: "404 not found" });
    })
    .post((req, res) => {
        res.status(404).json({ err: "404 not found" });
    });

server.listen(process.env.BACKEND_PORT, process.env.HOSTNAME, () => {
    console.log(
        `server running at http://${process.env.HOSTNAME}:${process.env.BACKEND_PORT}`
    );
});
