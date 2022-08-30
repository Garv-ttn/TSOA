const express = require('express');
import { app } from "./app";
import dbconnect from "./db/dbconnect";

const path = require('path');

app.use(express.static(path.join(__dirname,'build1')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'build1','index.html'))
});


const port = process.env.PORT || 7070;

dbconnect();
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);