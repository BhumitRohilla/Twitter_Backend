require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');


//Middlewaer
app.use(express.json());
app.use(cors({
    origin:process.env.HOSTNAME,
    credentials: true
}))

//Router
const auth = require('./Router/auth');

app.route('/testConnection')
.get((req,res)=>{
    res.send('Working');
});

//TODO:- Implement Signup function

app.use('/auth',auth);

app.route('*').get((req,res)=>{res.status(404).json({err:'404 not found'});}).post((req,res)=>{res.status(404).json({err:'404 not found'});})

app.listen(process.env.BACKEND_PORT,process.env.HOSTNAME,()=>{
    console.log(`server running at http://${process.env.HOSTNAME}:${process.env.BACKEND_PORT}`)
})