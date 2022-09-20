const express = require('express');
const redis = require("redis");
import { app } from "./app";
import dbconnect from "./db/dbconnect";

const path = require('path');

app.use(express.static(path.join(__dirname,'build1')));

app.get(['/','/*'],(req,res)=>{
    res.sendFile(path.join(__dirname,'build1','index.html'))
});


const port = process.env.PORT || 7070;
const redis_port = process.env.PORT || 6379;



dbconnect();
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);