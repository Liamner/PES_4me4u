const { response } = require('express');
const { check } = require('express-validator');
const Product = require('../models/product.js');
const User = require('../models/user.js');
const Report = require('../models/report.js')
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');


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

/*
  if ('ADMIN' != req.user.role) {
    res.status(401).json({error: "Do not have permission"})
    return;
  }*/
  const user = await User.findbyId(req.user.id);
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
/*
  if ('ADMIN' != req.user.role) {
    res.status(401).json({error: "Do not have permission"})
    return;
  }*/

  const user = await User.findbyId(req.user.id);
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

exports.closeReport = async (req, res) => {

  /*if ('ADMIN' != req.user.role) {
    res.status(401).json({error: "Do not have permission"})
    return;
  }*/

  const user = await User.findbyId(req.user.id);
  if (user.role != 'ADMIN'){
    res.status(401).json({error: "Do not have permission"})
    return;
  }

    try{
        const report = await Report.findById({_id: req.params.id});
        report.solved = true;
        report.save();
        //posar si el user te strike o no 
        res.status(200).json(report);

    }
    catch (error){
        res.status(404).json(error.message);
        console.log(error.message);
    }
}

exports.createReport = async (req, res) => {
  const report = new Report();
  product.userReporting = req.user.id;
  product.userReported = req.body.userReported;  
  product.description = req.body.description;
  product.publishingDate = req.body.publishingDate;
  product.relatedProduct = req.body.relatedProduct;         
 
  try {   
  const UserReporting = await User.findOne({_id: req.user.id});
  if (userReporting == null) res.status(404).json({error:"UserReporting not found"});

  const UserReported = await User.findOne({_id: req.body.userReported});
  if (userReported == null) res.status(404).json({error:"UserReported not found"});
   
  if (category != null && type != null) {
    /*
    const newProduct = await product.save();
    // Add the product to the user 
    const user = await User.findByIdAndUpdate(
                            { _id: ObjectId(req.user.id) }, 
                              {$push : {
                                products: newProduct
                              }
                            });

    const categories = await Category.findOneAndUpdate(
                            { name: req.body.categories }, 
                                {$push : {
                                  products: newProduct
                                }
                              });

    const types = await Type.findOneAndUpdate(
                                { name: req.body.exchange }, 
                                    {$push : {
                                      products: newProduct
                                    }
                                  });
           */                   
    res.status(201).json(report);}

  } catch (error) {
    res.status(409).json(error.message);

    console.log("Can not create the Report");
  }
};

exports.deleteReport = async (req, res) => {

  /*if ('ADMIN' != req.user.role) {
    res.status(401).json({error: "Do not have permission"})
    return;
  }*/

  const user = await User.findbyId(req.user.id);
  if (user.role != 'ADMIN'){
    res.status(401).json({error: "Do not have permission"})
    return;
  }
  
  try {    
    const report = await Report.findByIdAndDelete({_id: req.params.id});
//caldria suprimir també els links
  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
};

