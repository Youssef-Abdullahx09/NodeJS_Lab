const express = require("express");
const teacherController = require("./../Controller/teacherController");
const validateMW = require("./../Core/validations/validateMW");
const teacherValidationArrays = require("./../Core/validations/teacherValidationArray");
const Authorize = require("./../Core/Authentication/Authorize")
const multer = require("multer");
const path = require("path");

const router = express.Router();

router.route("/teacher")
        .get(Authorize.teacherAndAdminAuth,teacherController.getAllTeachers)
        .post(multer({
                storage : multer.diskStorage({
                        destination : (req,file,callback)=>{
                                callback(null, path.join(__dirname,"..","images"));
                        }
                        ,
                        filename : (req,file,callback)=>{
                                let extArray = file.mimetype.split("/");
                                let extension = extArray[extArray.length - 1];
                                console.log(extension)
                                callback(null, file.fieldname + '-' + Date.now()+ '.' +extension);  
                        }
                })
        }).single("image"),Authorize.adminAuth, teacherValidationArrays.postArray, validateMW, teacherController.addTeacher)
        .patch(Authorize.adminAuth, teacherValidationArrays.patchArray, validateMW, teacherController.updateTeacher)
        .delete(Authorize.adminAuth, teacherValidationArrays.idArray, validateMW, teacherController.deleteTeacher);
router.route("/teacher/:id")
        .get(Authorize.teacherAndAdminAuth, teacherValidationArrays.idArray, validateMW, teacherController.getTeacher);
module.exports = router;