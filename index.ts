
const express = require('express');
const {Server} = require("socket.io")
const {createServer} = require("http") 
const cors = require("cors")

const app = express();
app.use(cors({origin : "http://localhost:3000"}))

const httpServer = createServer(app);

const io = new Server(httpServer , {cors : "http://localhost:3000"});

io.on("connection" , (socket) => {
    console.log('socket connected');
})
httpServer.listen(5000 , () =>{
    console.log('server is running on port 5000');
})



// app.listen(3000 , () => {
//     console.log('server is running on port 3000');
// })