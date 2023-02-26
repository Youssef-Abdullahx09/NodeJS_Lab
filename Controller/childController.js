const mongoose = require("mongoose");
require("./../Model/childModel");

const childSchema = mongoose.model("child");

exports.getAllChildren = (req,res,next) =>{
    childSchema.find({})
        .then((data)=>{
            res.status(200).json({
                status:"success",
                data:{
                    data
                }})
        })
        .catch(error => next(error));
}
exports.getChild = (req, res,next) =>{
    childSchema.findOne({_id : req.body.id})
        .then((data)=>{
            if(data != null)
            {
                res.status(200).json({
                    status:"success",
                    data 
                })
            }
            else
                throw new Error("No Child with this Id");
        })
        .catch(error =>next(error));
}
exports.addChild = (req, res,next) =>{
    new childSchema({
        _id : req.body.id,
        fullName : req.body.fullName,
        age : req.body.age,
        level : req.body.level,
        address :{
            city : req.body.address.city,
            street : req.body.address.street,
            building : req.body.address.building
        }
    }).save()
    .then((data) =>{
        res.status(201).json({
            status : "success",
            data : {
                data
            }
        })
    })
    .catch(error => next(error));
}
exports.updateChild = (req,res,next) =>{
    childSchema.updateOne(
        { _id : req.body.id},
        {
            $set : {
                fullName : req.body.fullName,
                age : req.body.age,
                level : req.body.level,
                address : {
                    city : req.body.city,
                    street : req.body.street,
                    building : req.body.building
                }
            }
        })
        .then((data) =>{
            if(data.modifiedCount != 0)
            {
                res.status(200).json({
                    status : "success",
                    data
                })
            }
            else
                throw new Error("No Child with this Id");
        })
        .catch(error => next(error));
}
exports.deleteChild = (req,res,next) =>{
    childSchema.deleteOne({_id : req.body.id})
        .then(data =>{
            if(data.deletedCount != 0)
            {
                res.status(200).json({
                    status : "success",
                    data
                })
            }
            else
                throw new Error("No Child with this Id");
        })
        .catch(error => next(error));
}