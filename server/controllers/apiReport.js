const { response } = require('express');
const { check } = require('express-validator');
const Product = require('../models/product.js');
const User = require('../models/user.js');
const Report = require('../models/report.js')
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const productController = require('./apiProduct.js');
const userController = require('./apiProduct.js');

exports.readAllReports =  async (req, res) => {

  if ('ADMIN' != req.user.role) {
    res.status(401).json({error: "Do not have permission"})
    return;
  }

  try {
    const report = await Report.find();
    res.status(200).json(report);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};

exports.readUserReports = async (req, res) => {

  if ('ADMIN' != req.user.role) {
    res.status(401).json({error: "Do not have permission"})
    return;
  }

  try {
    const report = await Report.find({ userReported: req.params.userReported });

    console.log("Reading Reports from " + req.params.userReported + ": ");

    res.status(200).json(report);
  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
};

exports.readNoSolvedUserReports = async (req, res) => {

  if ('ADMIN' != req.user.role) {
    res.status(401).json({error: "Do not have permission"})
    return;
  }

    try {
      const report = await Report.find({ userReported: req.params.userReported, solved: false});
  
      console.log("Reading No Solved Reports from " + req.params.userReported + ": ");
  
      res.status(200).json(reports);
    } catch (error) {
      res.status(404).json(error.message);
      console.log(error.message);
    }
  };

exports.closeReport = async (req, res) => {

  if ('ADMIN' != req.user.role) {
    res.status(401).json({error: "Do not have permission"})
    return;
  }

    try{
        let report = await Report.findById({_id: req.params.id});
        report.solved = true;
        report.strike = req.body.strike;
        
        if (req.body.strike == true) {
          
          let user = await User.findById(report.userReported);
          
          if (report.relatedProduct != null) {
          let product = await Product.findById(report.relatedProduct);
          let req1, res1;
          req1.user.id = report.userReported;
          req1.params.id = report.relatedProduct;
          productController.deleteProduct(req1,res1);
        } 

        user.strikes ++;
       //if (user.strikes >= 3) //user.deleteUser(); 
      }
        report.save();
        res.status(200).json(report);

    }
    catch (error){
        res.status(404).json(error.message);
        console.log(error.message);
    }
}

exports.createReport = async (req, res) => {
  const report = new Report();
  report.userReporting = req.user.id;
  report.userReported = req.body.userReported;  
  report.description = req.body.description;
  report.publishingDate = req.body.publishingDate;
  report.relatedProduct = req.body.relatedProduct;         

  try {   
  const UserReporting = await User.findOne({_id: req.user.id});
  if (UserReporting == null) res.status(404).json({error:"UserReporting not found"});

  const UserReported = await User.findOne({_id: req.body.userReported});
  if (UserReported == null) res.status(404).json({error:"UserReported not found"});
  await report.save();

  res.status(201).json(report);

  } catch (error) {
    res.status(409).json(error.message);

    console.log("Can not create the Report");
  }
};

exports.deleteReport = async (req, res) => {

  if ('ADMIN' != req.user.role) {
    res.status(401).json({error: "Do not have permission"})
    return;
  }
  
  try {    
    const report = await Report.findByIdAndDelete({_id: req.params.id});

  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
};

