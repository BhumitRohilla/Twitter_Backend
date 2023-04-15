require('dotenv').config();
const express = require('express');
const app = express();



//Router
const auth = require('./Router/auth');

//Middlewaer
app.use(express.json());

app.route('/')
.get((req,res)=>{
    res.send('test');
});

app.use('/auth',auth);

app.listen(process.env.BACKEND_PORT,process.env.HOSTNAME,()=>{
    console.log(`server running at http://${process.env.HOSTNAME}:${process.env.BACKEND_PORT}`)
})