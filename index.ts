

const express = require('express');
const {Server} = require("socket.io")
const {createServer} = require("http") 
const cors = require("cors")

const app = express();

// const isDev = app.settings.env === "development"
const URLL = "https://doodleboard-new.netlify.app"

app.use(cors({origin : URLL}))

const httpServer = createServer(app);

const io = new Server(httpServer , {cors : URLL});
const port = process.env.PORT || 5000

// let Users : string[] = [];


io.on("connection" , (socket) => {
    socket.on('createRoom' , ({roomName , userName ,  id}) => {
        console.log(roomName ,userName ,  id);
        socket.join(roomName) 
        io.to(id).emit('connected',userName +' joined the room')   
    })
    socket.on('joinRoom' , ({roomName , userName ,  id}) => {
         
        socket.join(roomName)
        
        // Users.push(userName)
        io.to(roomName).emit( 'newUser' ,{ username : userName , roomname : roomName})
        socket.on('beginPath' , (arg) => {
            // socket.broadcast.to(roomName).emit('beginPath', arg)
            io.sockets.to(roomName).emit( 'beginPath' , arg)
         })
         socket.on('drawLine', (arg) =>{
            // socket.broadcast.to(roomName).emit('drawLine', arg)
            io.sockets.to(roomName).emit( 'drawLine' , arg)
        })
        socket.on('config' , (arg) => {
            // socket.broadcast.to(roomName).emit('config', arg)
            io.sockets.to(roomName).emit( 'config' , arg)
            
        })
        socket.on('activeItem' , (arg) => {
            // socket.broadcast.to(roomName).emit('activeItem', arg)
            io.sockets.to(roomName).emit( 'activeItem' , arg)
            
        })

    })
    
   

    
})





httpServer.listen(port , () =>{
    console.log(`server is running on port ${port}` );
})



// app.listen(3000 , () => {
//     console.log('server is running on port 3000');
// })