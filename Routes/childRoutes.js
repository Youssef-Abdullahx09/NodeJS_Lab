const express = require("express");
const childController = require("./../Controller/childController");
const validateMW = require("./../Core/validations/validateMW");
const childValidationArrays = require("./../Core/validations/childValidationArray");
const Authorize = require("./../Core/Authentication/Authorize")

const router = express.Router();

router.route("/child")
        .all(Authorize.teacherAndAdminAuth)
        .get(childController.getAllChildren)
        .post(childValidationArrays.postArray, validateMW, childValidationArrays.postArray,validateMW,childController.addChild)
        .patch(childValidationArrays.patchArray, validateMW, childController.updateChild)
        .delete(childValidationArrays.idArray, validateMW, childController.deleteChild);
router.route("/child/:id")
        .get(Authorize.teacherAndAdminAuth, childValidationArrays.idArray, validateMW, childController.getChild);
module.exports = router;