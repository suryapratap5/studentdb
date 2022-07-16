require('dotenv').config()
const express = require('express')
const app = express();

const connectMongodb = require('./conn/db');

connectMongodb();

const PORT = process.env.PORT;

app.use(express.json());

app.use(express.urlencoded({extended : true}));


app.use('/auth', require('./routes/Router'))

// app.post('/auth/signup', (req, res)=>{
//     console.log(req.body)
// })







app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))




