module.exports = async (req, res, next) => {
    console.log(req.headers)
    if(!req.headers.token){
        return res.send("Not Authenticated");
    }
    next();
}