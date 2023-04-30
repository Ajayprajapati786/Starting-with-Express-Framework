const express = require('express');
const path = require('path');

const rootDir = require('../util/path')

const router = express.Router();

router.get('/',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','shop.html'));
})

router.get('/contact',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','contact.html'))
  })

  router.get('/success',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','success.html'))
  })

  router.post("/contact", (req, res, next) => {
    console.log("contact route accessed");
    console.log(req.body);
    res.redirect("/success");
  });

module.exports = router;