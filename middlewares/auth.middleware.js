const jwt = require("jsonwebtoken");

const auth = (req, res, next)=>{
    const token = req.headers.authorization.split(" ")[1];
    if(token){
        jwt.verify(token, "shatru47", (err, decoded)=>{
            if(err) res.send({"error": err});
            if(decoded){
                req.body.userID = decoded.userID;
                req.body.username = decoded.username
                next();
            }else{
                res.status(200).send({"message": "Please Login !!"})
            }
        })
    }else{
        res.status(200).send({"message": "Please Login !!"})
    }
}

module.exports = {
    auth
}