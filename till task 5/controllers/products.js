const rootDir = require("../util/path");
const path = require("path");

exports.getAddProduct = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
};

exports.postAddProduct = (req, res, next) => {
  console.log("Product route accessed");
  console.log(req.body);
  res.redirect("/");
};

exports.getContact = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "contact.html"));
};


exports.postContact = (req, res, next) => {
    console.log("contact route accessed");
    console.log(req.body);
    res.redirect("/success");
  }

exports.getSuccess = (req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','success.html'))
  }