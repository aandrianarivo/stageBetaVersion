module.exports = (io,socket) =>{
    const signalRupt = (notif)=>{
        io.emit('stock:is-rupt',notif)
    }
    socket.on("stock:rupture",signalRupt)
}