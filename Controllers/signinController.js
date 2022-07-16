require('dotenv').config()
const Joi = require("joi");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const  Jwt  = require("jsonwebtoken");

const signinController = {

    async signin(req, res, next){

        // data validation

        const signinSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        })

        const {error} = signinSchema.validate(req.body)

        if(error){
            res.json(error.message)
        }

        let access_token;

        try {
            const user = await Admin.findOne({email : req.body.email})
            console.log(user);
            if(!user){
                return res.json({error : "Wrong Credetials"})
            }

            // password matching 

            const passwordMatch = await bcrypt.compare(req.body.password, user.password);

            if(!passwordMatch){
                return res.json({error : "Wrong Credetials"})
            }

            const access_token = await Jwt.sign({id : user._id}, process.env.JWT_SECRET)

            return res.json({access_token});

        } catch (error) {
            console.log(error)
            return res.json(error);
        }

        
    }
}


module.exports = signinController;