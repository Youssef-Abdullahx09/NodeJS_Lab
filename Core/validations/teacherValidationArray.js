const {body} = require("express-validator");

exports.postArray = [
    body("id").isNumeric().withMessage("id Needs to be Object ID"),
    body("fullName").isAlpha().withMessage("full Name must be String"),
    body("password").isStrongPassword().withMessage("password needs to have numbers,capital,small and symbol"),
    body("email").isEmail().withMessage("Email must be like xx@xx.xx"),
    body("image").isString().optional().withMessage("image must be string")

];
exports.patchArray = [
    body("id").isNumeric().withMessage("id Needs to be Object ID"),
    body("fullName").optional().isAlpha().withMessage("full Name must be String"),
    body("password").optional().isStrongPassword().withMessage("password needs to have numbers,capital,small and symbol"),
    body("email").optional().isEmail().withMessage("Email must be like xx@xx.xx"),
    body("image").optional().isString().withMessage("image must be string")

];
exports.idArray = [
    body("id").isNumeric().withMessage("id Needs to be Object ID"),
]