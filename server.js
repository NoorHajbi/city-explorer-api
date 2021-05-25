'use strict';
const express = require ('express'); //when you require it you need to install  (npm i express)
require('dotenv').config(); // npm i dotenv
const server = express();
// const PORT = 3001;
const PORT = process.env.PORT;

server.listen (PORT,()=> {
    console.log (`listening on PORT ${PORT}`);
})
