const {sequelize} = require('./models/index');
const express = require('express');
const http = require('node:http')
const {Server} = require('socket.io');
const RootRouter = require('./routes');
const cors = require('cors');
const { onConnection } = require('./Socket');
const port = process.env.PORT || 5000;



const app = express();
const server = http.createServer(app)

const IO = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods: ["GET","POST"],
        allowedHeaders : ["my-custom-header"],
        credentials:true
    }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/',RootRouter);


IO.on('connection',onConnection(IO));

sequelize.sync({
    // force:true,
    alter:true

})
    .then(()=>{
        console.log("Connexion sucess")
    })
    .catch((error)=>{
        console.error(error);
    })

server.listen(port,()=> console.log(`Server is running on ${port}`))