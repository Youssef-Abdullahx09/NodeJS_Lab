const {body} = require("express-validator");

exports.idArray = [body("id").isNumeric().withMessage("id Must be Integer")]
exports.postArray = [
    body("id").isNumeric().withMessage("id Must be Integer"),
    body("name").isAlpha().withMessage("name needs to be Alpha"),
    body("children").isArray().withMessage("children needs to be Array")
];
exports.patchArray = [
    body("id").isNumeric().withMessage("id Must be Integer"),
    body("name").optional().isAlpha().withMessage("name needs to be Alpha"),
    body("children").optional().isArray().withMessage("children needs to be Array")
]