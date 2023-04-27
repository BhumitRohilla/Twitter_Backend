require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

//Middlewaer
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static('Uploads'));
app.use(cors({
    origin:`http://${process.env.HOSTNAME}:${process.env.FRONTEND_PORT}`,
    credentials: true
}))

//Router
const auth = require('./Router/auth');
const tweet = require('./Router/tweet');
const user = require('./Router/user');
const check = require('./Router/check');

//Middleware

const {authorize} = require('./Middleware/authrization');


app.route('/testConnection')
.get((req,res)=>{
    res.send('Working');
});

//TODO:- Implement Signup function

app.use('/auth',auth);

app.use('/tweet',tweet);

app.use('/user',authorize,user);

app.use('/check',check);

app.route('*').get((req,res)=>{res.status(404).json({err:'404 not found'});}).post((req,res)=>{res.status(404).json({err:'404 not found'});})

app.listen(process.env.BACKEND_PORT,process.env.HOSTNAME,()=>{
    console.log(`server running at http://${process.env.HOSTNAME}:${process.env.BACKEND_PORT}`)
})