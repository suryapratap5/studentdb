require('dotenv').config()
const  Jwt  = require("jsonwebtoken");


const authenticateUser = async(req, res, next) =>{

    const token = req.header('access_token');
    console.log(token)

    if(!token){
        res.status(401).send({ error: "Please authenticate using a valid toke" });
    }

    try {
        const data = Jwt.verify(token, process.env.JWT_SECRET)
        console.log(data);
        if(data){
            req.body.id = data.id;
            next() 
        }
        
    } catch (error) {
        return res.json(error.message)
    }

}




module.exports = authenticateUser;