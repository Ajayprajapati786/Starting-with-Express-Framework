const http = require('http');

const express = require('express');

const app = express();

app.use((req,res,next)=>{
    console.log("in the middle ware");
    next();//allows the request to continue to next middleware
})

app.use((req,res,next)=>{
    console.log("in another middle ware");
    res.send('<h1>Hello from express</h1>');
})

//console.log(routes.someText);

const server = http.createServer(app);

server.listen(3000);
