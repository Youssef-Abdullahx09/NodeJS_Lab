const mongoose = require("mongoose");
require("./../Model/classModel")

const classSchema = mongoose.model("class");

exports.getAllClass = (req,res,next) =>{
    classSchema.find({})
        //.populate({ path : "teacher"})
        .then((data) =>{
            res.status(200).json({
                status : "succes",
                data
            })
        })
        .catch(error => next(error));
}
exports.getClass = (req,res,next) =>{
    classSchema.findOne({_id : req.body.id})
        .then(data =>{
            if(data != null)
            {
                res.status(200).json({
                    status : "success",
                    data
                })
            }
            else
                throw new Error("No class Found with this Id");
        })
        .catch(error => next(error));
}
exports.addClass = (req,res,next) =>{
    new classSchema({
        _id : req.body.id,
        name : req.body.name,
        supervisor : req.body.supervisor,
        children : req.body.children
    }).save()
    .then(data => {
        res.status(201).json({
            status : "success",
            data
        })
    })
    .catch(error => next(error))
}
exports.updateClass = (req,res,next) =>{
    classSchema.updateOne(
        { _id : req.body.id },
            {
                $set : {
                    _id : req.body.id,
                    name : req.body.name,
                    supervisor : req.body.supervisor,
                    children : req.body.children
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
                throw new  Error("No Class With this Id Found!!")
        })
        .catch(error => next(error));
}
exports.deleteClass = (req,res,next) =>{
    classSchema.deleteOne({ _id : req.body.id})
        .then( data => {
            if(data.deletedCount != 0)
            {
                res.status(200).json({
                    status : "success",
                    data
                })
            }
            else
                throw new Error("No Class With this Id Found!!")
        })
        .catch(error => next(error));
}