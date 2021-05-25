'use strict';
const express = require ('express');
const server = express();
// const PORT = 3001;
const PORT = process.env.PORT;

server.listen (PORT,()=> {
    console.log (`listening on PORT ${PORT}`);
})
