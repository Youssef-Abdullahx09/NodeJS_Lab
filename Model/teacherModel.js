const mongoose = require("mongoose");

const schema = mongoose.Schema({
    _id : Number,
    fullName : String,
    password : String,
    email : String,
    image : String
})
mongoose.model("teacher",schema);