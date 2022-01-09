const Conversation = require('../models/convesration.js')

exports.getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find();
        res.status(200).json(conversations)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.newConversation = async (req, res) => {
    console.log(req.body.reciverId)
    const newConversation = new Conversation();
    newConversation.members.push(req.user.id)
    newConversation.members.push(req.body.reciverId)
    newConversation.productId = req.body.productId;
    
    /*members.push(req.user.id)

    members: [req.user.id, req.body.reciverId],
    productId: req.body.productId*/
    try {
        const savedConversation = await newConversation.save();
        
        res.status(201).json(savedConversation)  
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.getMyConversations = async (req, res) => {
    try {
        const userId = req.user.id;
        await Conversation.find({ members: {$in: [userId]} }, (erro, conversations) => {
            //console.log(conversations)
            res.status(200).json(conversations)
        }).populate([{path: 'productId', populate : {path: 'img'}}, {path: 'members', select: {userId: 1}}]).clone()
       
    } catch (error) {
        res.status(404).json(error)
    }
}