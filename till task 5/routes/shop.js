const express = require('express');
const path = require('path');

const rootDir = require('../util/path')

const router = express.Router();

router.get('/',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','shop.html'));
})

const contactsController = require('../controllers/products')


router.get('/contact',contactsController.getContact)

  router.post("/contact", contactsController.postContact);

  router.get('/success',contactsController.getSuccess)


module.exports = router;

