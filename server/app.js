const express = require("express")
const { PORT } = require("./config.env")
const { Server } = require("socket.io")
const http = require("http")
const app = express()
const server_of_app = http.createServer(app)




const io = new Server(server_of_app,{
     cors: {
          origin: '*'
        } 
})


io.on("connection",(socket)=>{
     socket.on("imhere",(e)=>{
          socket.broadcast.emit("user-join",e)
     })
     socket.on("send",(e)=>{
          console.log(e);
          socket.broadcast.emit("user-sended",e)
     })

})


app.get("/",function(req,res){
     res.end("Hello from server")
})






server_of_app.listen(PORT,()=>{
     console.log(`running on  ${PORT} port`);
})