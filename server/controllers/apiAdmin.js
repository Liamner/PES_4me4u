const Product = require('../models/product.js');
const User = require('../models/user.js');
const Category = require('../models/category.js');
const Admin = require('../models/admin.js');
const Report = require('../models/report.js');
const Comment = require('../models/comment.js');
const TradeLoan = require('../models/tradeLoan.js');
const TradeExchange = require('../models/tradeExchange.js');
const TradeGive = require('../models/tradeGive.js');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const user = require('../models/user.js');
const app = express();
const adminId = "61da133ecaf3d945081b65ee";

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
    //const adminId = req.params.id;
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
    //const adminId = req.params.id;
    const admin = await Admin.findById({_id: adminId});
    admin.gifts += 1;
    admin.save();

    //res.status(200).json(admin);
    //console.log(admin);

  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};

exports.readLoans =  async (req, res) => {
    try {
        //const adminId = req.params.id;
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
      //const adminId = req.params.id;
      const admin = await Admin.findById({_id: adminId});
      admin.loans += 1;
      admin.save();
  
      //res.status(200).json(admin);
      //console.log(admin);
    } catch (error) {
      res.status(400).json(error.message);
      console.log(error.message);
    }
  };

  exports.readExchanges =  async (req, res) => {
    try {
        //const adminId = req.params.id;
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
      //const adminId = req.params.id;
      const admin = await Admin.findById({_id: adminId});
      admin.changes += 1;
      admin.save();
      
      //res.status(200).json(admin);
      //console.log(admin);
  
    } catch (error) {
      res.status(400).json(error.message);
      console.log(error.message);
    }
  };

  exports.readTransactions =  async (req, res) => {
    try {
        //const adminId = req.params.id;
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
        //const adminId = req.params.id;
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
      //const adminId = req.params.id;
      //const adminId = "61d8d7022ba81367f067e683";
      const admin = await Admin.findById({_id: adminId});
      admin.users += 1;
      admin.save();
  
      //res.status(200).json(admin);
      //console.log(admin);
    } catch (error) {
      res.status(400).json(error.message);
      console.log(error.message);
    }
  };

  exports.readProducts =  async (req, res) => {
    try {
        //const adminId = req.params.id;
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
      //const adminId = req.params.id;
      //const adminId = "61d8d7022ba81367f067e683";
      const admin = await Admin.findById({_id: adminId});
      admin.products += 1;
      admin.save();
  
      //res.status(200).json(admin);
      //console.log(admin);
  
    } catch (error) {
      res.status(400).json(error.message);
      console.log(error.message);
    }
  };

  exports.readEcoPoints =  async (req, res) => {
    try {
        //const adminId = req.params.id;
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
      //const adminId = req.params.id;
      const points = req.body.points;
      const admin = await Admin.findById({_id: adminId});
      admin.ecoPoints += parseFloat(points);
      admin.save();
  
      //res.status(200).json(admin);
      //console.log(admin);
  
    } catch (error) {
      res.status(400).json(error.message);
      console.log(error.message);
    }
  };

  exports.readBlockedUsers =  async (req, res) => {
    try {
        //const adminId = req.params.id;
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
      //const adminId = req.params.id;
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

  exports.numTransasPorTipo = async (req, res) => {
    try {
      var loans, exchanges, gives;
      TradeLoan.count({}, (error, sizeLoans) => {
        loans = sizeLoans;
        TradeExchange.count({}, (error, sizeExchanges) => {
          exchanges = sizeExchanges;
          TradeGive.count({}, (error, sizeGives) => {
            gives = sizeGives;
            var result = {
              tradesLoans: loans,
              tradesExchange: exchanges,
              tradesGiven: gives,
              totalTrades: (loans+exchanges+gives)
            }
            res.status(200).json(result)
          })
        })
      })
      //console.log(TradeLoan.estimatedDocumentCount())
     
    } catch (error) {
      res.status(400).json(error)
    }
  }

  exports.numCategories = async (req, res) => {
    await Category.find((error, categories) => {
      console.log(categories.length)
      if (error) {
        res.status(500).json(error)
      }
      res.status(200).json(categories.length)
    }).clone()
  }

  exports.numPorductosReportados = async (req,res) => {
    await Report.distinct('relatedProduct', (error, reports) => {
      if (error) {
        res.status(500).json(error)
      }
      res.status(200).json(reports.length)
    }).clone()
  }

  exports.numUsuariosReportados = async (req,res) => {
    await Report.distinct('userReported', (error, reports) => {
      if (error) {
        res.status(500).json(error)
      }
      res.status(200).json(reports.length)
    }).clone()
  }

  exports.topProducts = async (req, res) => {
    const products = await Product.find().sort({views:-1}).limit(10) // for MAX
    if (products) res.status(200).json(products)
    else res.status(500)
  }
  
  exports.getTradeEcopoints = async (req, res) => {
    await TradeExchange.find({}, {points: 1}, async (error, exchanges) => {
      let totalEcopoints = 0;
      for (let i = 0; i< exchanges.length; i++) {
        if (exchanges[i].points) {
          totalEcopoints =  parseFloat(totalEcopoints)+parseFloat(exchanges[i].points)
        }
      }
      await TradeGive.find({}, {points: 1}, async (error, give) => {
        for (let i = 0; i< give.length; i++) {
          if (give[i].points) {
            totalEcopoints =  parseFloat(totalEcopoints)+parseFloat(give[i].points)
          }
        }
        await TradeLoan.find({}, {points: 1}, async (error, loans) => {
          for (let i = 0; i< loans.length; i++) {
            if (loans[i].points) {
              totalEcopoints =  parseFloat(totalEcopoints)+parseFloat(loans[i].points)
            }
          }
          res.status(200).json(totalEcopoints)
        }).clone()
      }).clone()
    }).clone()
  }