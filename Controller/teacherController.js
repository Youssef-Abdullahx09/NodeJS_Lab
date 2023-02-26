const mongoose = require("mongoose");
require("./../Model/teacherModel");
const TeacherSchema = mongoose.model("teacher");

exports.getAllTeachers = (req,res,next) => {
    TeacherSchema.find({})
        .then((data) =>{
            res.status(200).json({
                status : "success",
                data
            })
        })
        .catch(error => next(error));
}
exports.getTeacher = (req,res,next) =>{
    TeacherSchema.findOne({ _id : req.body.id })
        .then((data) => {
            if(data != null)
            {
                res.status(200).json({
                    status : "success",
                    data
                })
            }
            else
                throw new Error("No Teacher With this Id");
        })
        .catch(error => next(error));
}

exports.addTeacher = (req,res,next) =>{
    // console.log(req.file)
    new TeacherSchema({
        _id : req.body.id,
        fullName : req.body.fullName,
        password : req.body.password,
        email : req.body.email,
        image : req.file.originalname
    }).save()
    .then((data) => res.status(201).json({
        status : "success",
        data
    }))
    .catch(error => next(error));
}

exports.updateTeacher = (req,res,next) =>{
    TeacherSchema.updateOne(
        { _id : req.body.id },
        {
            $set:{

                fullName : req.body.fullName,
                password : req.body.password,
                email : req.body.email,
                image : req.body.image
            }
        }
    )
    .then(data =>{
        if(data.modifiedCount != 0)
        {
            res.status(200).json({
                status : "success",
                data
            })
        }
        else
            throw new Error("No Teacher With this Id");
        })
        
    .catch(error => next(error));
}
exports.deleteTeacher = (request,response,next) =>{
    TeacherSchema.deleteOne({ _id : request.body.id })
        .then( data => {
            if(data.deletedCount != 0)
            {
                response.status(200).json({
                    status : "success",
                    data 
                })
            }
            else
                throw new Error("No Teacher With this Id");
        })
        .catch(error => next(error));
}