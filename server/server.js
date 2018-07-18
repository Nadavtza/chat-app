//modules
const path  = require('path');

//library exports
const express = require('express');
//local exports



//consts
const publicPath = path.join(__dirname , '../public' );
const port = process.env.PORT ||  3000 ;  

//server
var app = express();
app.use(express.static(publicPath));

//console.log(publicPath);

app.listen(port , ()=>{
    console.log(`Server is up on port ${port}`);
});
