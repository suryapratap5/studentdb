require('dotenv').config()

const mongoose = require('mongoose')

const connectMongodb = ()=>{
    mongoose.connect(process.env.DB_URL, ()=>{
        console.log('connection successful')
    })
}

module.exports = connectMongodb;