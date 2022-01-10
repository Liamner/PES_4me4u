const TradeExchange = require('../models/tradeExchange.js');
const Product = require('../models/product.js');
const User = require('../models/user.js');
const adminController = require ('../controllers/apiAdmin.js')
const { ObjectId } = require('mongodb');

exports.readAllTradeExchange = async (req, res) => {
    try {
      const tradeExchange = await TradeExchange.find();
  
      res.status(200).json(tradeExchange);
      
    } catch (error) {
      res.status(400).json(error.message);
      console.log(error.message);
    }
};
  
  exports.readTradeExchange = async (req, res) => {
    try {
      const tradeExchange = await TradeExchange.findById({_id: req.params.id});
  
      console.log('Reading TradeExchange: ' + req.params.id);
  
      res.status(200).json(tradeExchange);
    } catch (error) {
      res.status(404).json(error.message);
      console.log(error.message);
    }
};
  
  exports.createTradeExchange = async (req, res) => {
    const tradeExchange = new TradeExchange();

    tradeExchange.userOfering = req.user.id;
    tradeExchange.userTaking = req.body.userTaking;
    tradeExchange.productOfering = req.body.productOfering;
    tradeExchange.productTaking = req.body.productTaking;
    tradeExchange.publishingDate = req.body.publishingDate;
    tradeExchange.points = req.body.points; 
     
    try {
        const userOfering = await User.findById({_id:req.user.id});
        if (userOfering == null) res.status(404).json({error:"userOfering not found"});
      
        const userTaking = await User.findById({_id:req.body.userTaking});
        if (userTaking == null) res.status(404).json({error:"userTaking not found"});

        if (req.user.id == req.body.userTaking) res.status(404).json({error:"userTaking == userOfering"});
       
        const productOfering = await Product.findById({_id:req.body.productOfering, userId: req.user.id});
        if (productOfering == null) res.status(404).json({error:"productOfering not found"});

        const productTaking = await Product.findById({_id:req.body.productTaking, userId: req.body.userTaking});
        if (productTaking == null) res.status(404).json({error:"productTaking not found"}); 
        
        if (userTaking.points < tradeExchange.points) res.status(404).json({error:"not enought points"});
        
        if (userOfering != null && userTaking != null && productOfering != null && productTaking  != null && req.body.userOfering != req.body.userTaking) {
          //product.state = "reserved";
          productOfering.state = "reserved";
          productTaking.state = "reserved";
          //await product.save();
          await productOfering.save();
          await productTaking.save();

          await tradeExchange.save();
          adminController.increaseExchanges();

          // ==================
          // get user rewards
          // ==================
          const userO = await User.findById({_id:req.user.id});
          const userT = await User.findById({_id:req.body.userTaking});
          userO.changes += 1;
          userT.changes += 1;
          
          let estimatedPoints = req.body.points;
          let eco = userO.ecoPoints;
          let total = 0;
          if(estimatedPoints == 15) total = parseFloat(eco)+parseFloat(estimatedPoints);
          else res.status(400).json({error: 'Estimated points are too high'})
          userO.ecoPoints = total;
          userT.ecoPoints += 15;
          await userO.save();
          await userT.save();

          // ==================
          // getRewards
          // ==================
          const userRewards = await User.findById({_id:req.user.id});
          let nexchanges = userRewards.changes;
          let points = userRewards.ecoPoints;
          let rewards = 0;
          if(nexchanges >= 3) {
            if(nexchanges >=3 && nexchanges <= 5) rewards += parseFloat(10);
            else if(nexchanges >= 5 && nexchanges <= 7) rewards += parseFloat(50);
            else if (nexchanges >= 7 && nexchanges <= 10) rewards += parseFloat(100);
            else if(nexchanges >= 10) rewards += parseFloat(150);
          
            userRewards.ecoPoints = parseFloat(points)+parseFloat(rewards)
            await userRewards.save();
          }

          const userRewardsT = await User.findById({_id:req.body.userTaking});
          let nexchangesT = userRewardsT.changes;
          let pointsT = userRewardsT.ecoPoints;
          let rewardsT = 0;
          if(nexchangesT >= 3) {
            if(nexchangesT >=3 && nexchangesT <= 5) rewardsT += parseFloat(10);
            else if(nexchangesT >= 5 && nexchangesT <= 7) rewardsT += parseFloat(50);
            else if (nexchangesT >= 7 && nexchangesT <= 10) rewardsT += parseFloat(100);
            else if(nexchangesT >= 10) rewardsT += parseFloat(150);
          
            userRewardsT.ecoPoints = parseFloat(pointsT)+parseFloat(rewardsT)
            await userRewardsT.save();
          }

          // ==================
          // levelManage
          // ==================
          const userLevel = await User.findById({_id:req.user.id});
          let nivelNuevo = 0, reward = 0;
          let nivelAntiguo = userLevel.level;
          let points2 = userLevel.ecoPoints;
          if(points2 < 50) nivelNuevo = '1'; // seed semilla
          else if (points2 >= 50 && points2 < 150) nivelNuevo = '2'; //brote outbreak
          else if (points2 >= 150 && points2 < 300) nivelNuevo = '3'; // plant
          else if (points2 >= 300 && points2 < 500) nivelNuevo = '4'; // tree
          else if(points2 >= 500 && points2 < 750) nivelNuevo = '5'; // roble oak
          else if (points2 >= 750) nivelNuevo = '6'; //ecologista ecologist
          //si ha subido de nivel gana una recompensa
          if(nivelAntiguo != nivelNuevo) {
            if(nivelNuevo == '2') reward = 20;
            else if (nivelNuevo == '3') reward = 40;
            else if (nivelNuevo == '4') reward = 60;
            else if (nivelNuevo == '5') reward = 80;
            else if (nivelNuevo == '6') reward = 100;
          }
          if (reward != 0) userLevel.ecoPoints += parseFloat(reward);
          if (nivelNuevo != 0) userLevel.level = nivelNuevo;
          await userLevel.save();


          const userLevelT = await User.findById({_id:req.body.userTaking});
          let nivelNuevoT = 0, rewardT = 0;
          let nivelAntiguoT = userLevelT.level;
          let pointsTT = userLevelT.ecoPoints;
          if(pointsTT < 50) nivelNuevoT = '1'; // seed semilla
          else if (pointsTT >= 50 && pointsTT < 150) nivelNuevoT = '2'; //brote outbreak
          else if (pointsTT >= 150 && pointsTT < 300) nivelNuevoT = '3'; // plant
          else if (pointsTT >= 300 && pointsTT < 500) nivelNuevoT = '4'; // tree
          else if(pointsTT >= 500 && pointsTT < 750) nivelNuevoT = '5'; // roble oak
          else if (pointsTT >= 750) nivelNuevoT = '6'; //ecologista ecologist
          //si ha subido de nivel gana una recompensa
          if(nivelAntiguoT != nivelNuevoT) {
            if(nivelNuevoT == '2') rewardT = 20;
            else if (nivelNuevoT == '3') rewardT = 40;
            else if (nivelNuevoT == '4') rewardT = 60;
            else if (nivelNuevoT == '5') rewardT = 80;
            else if (nivelNuevoT == '6') rewardT = 100;
          }
          if (rewardT != 0) userLevelT.ecoPoints += parseFloat(rewardT);
          if (nivelNuevoT != 0) userLevelT.level = nivelNuevoT;
          await userLevelT.save();


          res.status(201).json(tradeExchange);  
     }

    } catch (error) {
      res.status(409).json(error.message);
      
      console.log('Can not create the tradeExchange');
    }
};

  exports.deleteTradeExchange = async (req, res) => {
  
    const user = await User.findById(req.user.id);
    if (user.role != 'ADMIN'){
      res.status(401).json({error: "Do not have permission"})
      return;
    }
    
      try {
        const tradeExchange = await TradeExchange.findByIdAndDelete({_id: req.params.id});
    
        console.log('Reading tradeExchange: ' + req.params.id);
    
        res.status(200).json(tradeExchange);
      } catch (error) {
        res.status(404).json(error.message);
        console.log(error.message);
      }
};