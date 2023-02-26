const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("./../Model/teacherModel");
const TeacherSchema = mongoose.model("teacher");

module.exports = async (req,res,next) =>{
    if( req.body.email && req.body.password )
    {
        let data = await TeacherSchema.findOne({ email : req.body.email },{ image : 0, fullName : 0 });
        try
        {
            if(req.body.email === "admin" && req.body.password === "admin")
            {
                let token = jwt.sign(
                    {role : "admin"},
                    "OSTrack",
                    { expiresIn : "20m" }
                )
                res.status(200).json({message:"Authenticated",token});
            }
            else if(data["password"] === req.body.password)
            {
                let token = jwt.sign(
                    { id : data["_id"], role : "teacher"},
                    "OSTrack",
                    { expiresIn : "20m" }
                )
                res.status(200).json({message:"Authenticated",token});
            }
            else
                throw new Error("Password you provided Incorrect");
        }
        catch(error)
        {
            next(error);
        }
            // .then((data) => {

            //     if(data["password"] === req.body.password)
            //     {
            //         let token = jwt.sign(
            //             { id : data["_id"], role : "teacher"},
            //             "OSTrack",
            //             { expiresIn : "20m" }
            //         )
            //         res.status(200).json({message:"Authenticated",token});
            //     }
            //     else
            //         throw new Error("Password you provided Incorrect");
            // })
            // .catch(error => next(error));
    }
    else
        next(new Error("email and password are needed"));
}