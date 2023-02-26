const express = require("express");
const classControllers = require("./../Controller/classController");
const validateMW = require("./../Core/validations/validateMW");
const classValidationArrays = require("./../Core/validations/classValidationArray")
const Authorize = require("./../Core/Authentication/Authorize")

const router = express.Router();

router.route("/class")
        .all(Authorize.teacherAndAdminAuth)
        .get(classControllers.getAllClass)
        .post(classValidationArrays.postArray, validateMW, classControllers.addClass)
        .patch(classValidationArrays.patchArray, validateMW, classControllers.updateClass)
        .delete(classValidationArrays.idArray, validateMW, classControllers.deleteClass);

router.route("/class/:id")
        .get(Authorize.teacherAndAdminAuth, classValidationArrays.idArray, validateMW, classControllers.getClass);

module.exports = router;