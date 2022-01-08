const Product = require('../models/product.js');
const User = require('../models/user.js');
const Admin = require('../models/admin.js');
const Comment = require('../models/comment.js');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const user = require('../models/user.js');
const app = express();

exports.registerAdmin = async (req, res) => {
  let body = req.body;
  let { userId, email, pwd, role } = body;
  let admin = new Admin({
    userId,
    email,
    pwd: bcrypt.hashSync(pwd, 10),
    role,
    
  });
  try {
    await admin.save();
    res.status(200).json(admin);
  }
  catch (err){
    res.status(400).json(err.message);
    console.log("Can not register the admin");
  }
}

exports.deleteAdmin = async (req, res) => {
  //let usr = await Admin.findById({_id: req.params.id})
  //let email = req.params.email; 
  try{
    let adm = await Admin.findById({_id: req.params.id})
    adm.delete();
    res.status(200).json(adm);
  }
  catch(err) {
    res.status(400).json(err.message);
    console.log("Can not delete the user");
  }
}

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

exports.increaseGifts =  async (req, res) => {
  try {
    const adminId = req.params.id;
    const admin = await Admin.findById({_id: adminId});
    admin.gifts += 1;
    admin.save();

    res.status(200).json(admin);
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

  exports.increaseLoans =  async (req, res) => {
    try {
      const adminId = req.params.id;
      const admin = await Admin.findById({_id: adminId});
      admin.loans += 1;
      admin.save();
  
      res.status(200).json(admin);
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

  exports.increaseExchanges =  async (req, res) => {
    try {
      const adminId = req.params.id;
      const admin = await Admin.findById({_id: adminId});
      admin.changes += 1;
      admin.save();
  
      res.status(200).json(admin);
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

  exports.increaseUsers =  async (req, res) => {
    try {
      const adminId = req.params.id;
      const admin = await Admin.findById({_id: adminId});
      admin.users += 1;
      admin.save();
  
      res.status(200).json(admin);
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

  exports.increaseProducts =  async (req, res) => {
    try {
      const adminId = req.params.id;
      const admin = await Admin.findById({_id: adminId});
      admin.products += 1;
      admin.save();
  
      res.status(200).json(admin);
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

  exports.increaseEcopoints =  async (req, res) => {
    try {
      const adminId = req.params.id;
      const points = req.body.points;
      const admin = await Admin.findById({_id: adminId});
      admin.ecoPoints += points;
      admin.save();
  
      res.status(200).json(admin);
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

  exports.increaseBlockedUsers =  async (req, res) => {
    try {
      const adminId = req.params.id;
      const admin = await Admin.findById({_id: adminId});
      admin.blockedUsers += 1;
      admin.save();
  
      res.status(200).json(admin);
      console.log(admin);
  
    } catch (error) {
      res.status(400).json(error.message);
      console.log(error.message);
    }
  };

