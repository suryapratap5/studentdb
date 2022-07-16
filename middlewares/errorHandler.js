require('dotenv').config();
const {ValidationError} = require('joi')

const errorHandler = (err, req, res, next)=>{

    let statusCode = 500;
    
    let data = {
        message : 'Internal server error',
        ...(process.env.DEBUG_MODE === true) && {originalError : err.message}
        
    }

    if(err instanceof ValidationError){
        statusCode = 422;
        data = {
            message : err.message
        }
    }

    return res.status(statusCode).json(data);

}


module.exports = errorHandler;