const stockHandler = require('./stockHandler')
const onConnection = (IO)=>{
    return (socket)=>{
        console.log("Hello connected client")
        stockHandler(IO,socket);
        socket.on("newRequest",(data)=>{
            socket.broadcast.emit("newRequestTL",data);
        })
        socket.on("alertAdmin",data=>{
            socket.broadcast.emit("forAdmin",data)
        })
    }
}
exports.onConnection = onConnection;