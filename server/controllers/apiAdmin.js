const Product = require('../models/product.js');
const User = require('../models/user.js');
const Admin = require('../models/admin.js');
const Comment = require('../models/comment.js');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const user = require('../models/user.js');
const app = express();

exports.readGifts =  async (req, res) => {
  try {
    const adminId = req.params.id;
    const admin = await Admin.findById({_id: adminId});

    res.status(200).json(admin.gifts);

    console.log(admin);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};

exports.readLoans =  async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await Admin.findById({_id: adminId});

        res.status(200).json(admin.loans);

        console.log(admin);
    } catch (error) {
        res.status(400).json(error.message);
        console.log(error.message);
    }
  };

  exports.readExchanges =  async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await Admin.findById({_id: adminId});

        res.status(200).json(admin.changes);

        console.log(admin);
    } catch (error) {
        res.status(400).json(error.message);
        console.log(error.message);
    }
  };

  exports.readTransactions =  async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await Admin.findById({_id: adminId});

        let gifts = admin.gifts;
        let loans = admin.loans;
        let changes = admin.changes;
        let total = gifts + loans + changes;

        res.status(200).json(total);

        console.log(admin);
    } catch (error) {
        res.status(400).json(error.message);
        console.log(error.message);
    }
  };

  exports.readUsers =  async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await Admin.findById({_id: adminId});

        res.status(200).json(admin.users);

        console.log(admin);
    } catch (error) {
        res.status(400).json(error.message);
        console.log(error.message);
    }
  };

  exports.readProducts =  async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await Admin.findById({_id: adminId});

        res.status(200).json(admin.products);

        console.log(admin);
    } catch (error) {
        res.status(400).json(error.message);
        console.log(error.message);
    }
  };

  exports.readEcoPoints =  async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await Admin.findById({_id: adminId});

        res.status(200).json(admin.ecoPoints);

        console.log(admin);
    } catch (error) {
        res.status(400).json(error.message);
        console.log(error.message);
    }
  };

  exports.readBlockedUsers =  async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await Admin.findById({_id: adminId});

        res.status(200).json(admin.blockedUsers);

        console.log(admin);
    } catch (error) {
        res.status(400).json(error.message);
        console.log(error.message);
    }
  };

