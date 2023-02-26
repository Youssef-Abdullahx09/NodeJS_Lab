const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const teacherRoutes = require("./Routes/teacherRoutes");
const childRoutes = require("./Routes/childRoutes");
const classRoutes = require("./Routes/classRoutes");
const loginRoute = require("./Routes/loginRoute");
const authenticateMW = require("./Core/Authentication/AuthenticateMW");

const server = express();
let port = global.process.env.PORT || 8080;
mongoose.set("strictQuery",true);
mongoose.connect("mongodb://127.0.0.1:27017/NurseryProject")
        .then(()=>{
            console.log("DB Connected...");
            server.listen(port,() => {
                console.log(`server is listening on port ${port} ......`);
            });
        })
        .catch(error => console.log(error));


//Using Morgin displying alot of details
//server.use(morgan("combined"));
// to specify cors config as ip that can connect status code etc
server.use(cors());

// to parse json data from request
server.use(express.json());
// to parse text data from request
server.use(express.urlencoded({extended:false}));

server.use(loginRoute);
server.use(authenticateMW);


server.use(teacherRoutes);
server.use(childRoutes);
server.use(classRoutes);

//Handling Not Found MW
server.use((req,res) =>{
    res.status(404).json({
        status:"failed",
        Message : "Page Not Found 😖"
    })
})

//Handling ERROR MW
server.use((error,req,res,next) => {
    let status = error.status || 500;
    res.status(status).json({
        Status : "fail",
        Message : error +" 🤕"
    })
});