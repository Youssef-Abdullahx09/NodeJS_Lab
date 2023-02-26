const {body} = require("express-validator")
const Enum = require("enum");
let levelEnum = new Enum(["PreKG","KG1","KG2"]);


exports.idArray = [ body("id").isNumeric().withMessage("id needs to be Numeric") ]
exports.patchArray = [
    body("id").isNumeric().withMessage("id needs to be Numeric"),
    body("fullName").optional().isAlpha().withMessage("Full Name is Alpha"),
    body("age").optional().isNumeric().withMessage("Age is Numeric"),
    body("level").optional().isIn(levelEnum).withMessage("levels are PreKG,KG1,KG2"),
    body("address").optional().isObject().withMessage("Address is Object"),
    body("address.city").optional().isAlpha().withMessage("Address is Object"),
    body("address.street").optional().isAlphanumeric().withMessage("Address is Object"),
    body("address.building").optional().isAlpha().withMessage("Address is Object")
]

exports.postArray = [
    body("id").isNumeric().withMessage("id needs to be Numeric"),
    body("fullName").isAlpha().withMessage("Full Name is Alpha"),
    body("age").isNumeric().withMessage("Age is Numeric"),
    body("level").isIn(levelEnum).withMessage("levels are PreKG,KG1,KG2"),
    body("address").isObject().withMessage("Address is Object"),
    body("address.city").isAlpha().withMessage("city is Alpha"),
    body("address.street").isAlphanumeric().withMessage("street is Alphanumeric"),
    body("address.building").isAlpha().withMessage("building is Alpha")
]