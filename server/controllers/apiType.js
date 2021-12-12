const Type = require('../models/type.js');

exports.readAllTypes = async (req, res) => {
    try {
      const type = await Type.find();
  
      res.status(200).json(type);
      
      console.log(type);
    } catch (error) {
      res.status(400).json(error.message);
      console.log(error.message);
    }
  };
  
  exports.readType = async (req, res) => {
    try {
      const type = await Type.findById({_id: req.params.id});
  
      console.log('Reading type: ' + req.params.id);
  
      res.status(200).json(type);
    } catch (error) {
      res.status(404).json(error.message);
      console.log(error.message);
    }
  }
  
  exports.createType = async (req, res) => {

    const type = new Type();
    type.name = req.body.name;

    console.log(type);
  
    try {
      await type.save();
  
      res.status(201).json(type);

    } catch (error) {
      res.status(409).json(error.message);
      
      console.log('Can not create the Type');
    }
  }
  
  exports.updateType = async (req, res) => {

  }
  
  exports.deleteType = async (req, res) => {
  
      try {
        const type = await Type.findByIdAndDelete({_id: req.params.id});
    
        console.log('Reading type: ' + req.params.id);
    
        res.status(200).json(type);
      } catch (error) {
        res.status(404).json(error.message);
        console.log(error.message);
      }
    }