const mongoose = require("mongoose");

const schema = mongoose.Schema({
    _id : Number,
    name : String,
    supervisor : { 
        ref : "teacher",
        type : mongoose.Schema.Types.ObjectId
    },
    children : [
        {   ref : "child",
            type : Number 
        }
    ]
})
mongoose.model("class",schema)