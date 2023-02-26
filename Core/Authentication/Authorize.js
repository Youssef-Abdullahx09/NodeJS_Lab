module.exports.teacherAndAdminAuth = (req,res,next) =>{
    if(req.decodedToken.role === "teacher" || req.decodedToken.role === "admin")
        next();
    else
        next(new Error("Not Authorized"));
}
module.exports.adminAuth = (req,res,next) =>{
    if(req.decodedToken.role === "admin")
        next();
    else
        next(new Error("Not Authorized"));
}