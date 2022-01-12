const { response } = require('express');
const { check } = require('express-validator');
const Product = require('../models/product.js');
const User = require('../models/user.js');
const Report = require('../models/report.js')
const jwt = require('jsonwebtoken');
const adminController = require ('../controllers/apiAdmin.js')
const { ObjectId } = require('mongodb');
const productController = require('./apiProduct.js');
const userController = require('./apiProduct.js');

exports.readAllReports =  async (req, res) => {

  const user = await User.findById(req.user.id);
  console.log(user.role)
  if ('ADMIN' != user.role) {
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

  const user = await User.findById(req.user.id);
  if (user.role != 'ADMIN'){
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

  const user = await User.findById(req.user.id);
  if (user.role != 'ADMIN'){
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

  exports.readNoSolvedReports = async (req, res) => {
    
    const user = await User.findById({_id: req.user.id});

    if (user.role != 'ADMIN') {
      res.status(401).json({error: "Do not have permission"})
      return;
    }


      try {
        const reports = await Report.find({solved: false});
    
        console.log("Reading No Solved Reports: ");
    
        res.status(200).json(reports);
      } catch (error) {
        res.status(404).json(error.message);
        console.log(error.message);
      }
    };

exports.closeReport = async (req, res) => {



  const user = await User.findById(req.user.id);
  if (user.role != 'ADMIN'){
    res.status(401).json({error: "Do not have permission"})
    return;
  }

    try{
        const report = await Report.findById({_id: req.params.id});
        report.solved = true;
        report.strike = req.body.strike;
        
        if (report.strike == true) {
          
          let user = await User.findById(report.userReported);
          let product = await Product.findById(report.relatedProduct);
          if (product != null) {
            product.delete() //modificar amb crides
        } 

        user.strikes ++;
       if (user.strikes >= 3) user.deleteUser(); //modificar amb crides
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
  let report = new Report();
  report.userReporting = req.user.id;
  report.userReported = req.body.userReported;  
  report.description = req.body.description;
  report.publishingDate = Date.now();
  report.relatedProduct = req.body.relatedProduct;         

  try {   
  const UserReporting = await User.findOne({_id: req.user.id});
  if (UserReporting == null) res.status(404).json({error:"UserReporting not found"});

  const UserReported = await User.findOne({_id: req.body.userReported});
  if (UserReported == null) res.status(404).json({error:"UserReported not found"});
  await report.save();
  //adminController.increaseBlockedUsers();

  res.status(201).json(report);

  } catch (error) {
    res.status(409).json(error.message);

    console.log("Can not create the Report");
  }
};

exports.deleteReport = async (req, res) => {

  const user = await User.findbyId(req.user.id);
  if (user.role != 'ADMIN'){
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