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
    /*const newConversation = new Conversation({
        members: [req.user.id, req.body.reciverId]
    })
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation)  
    } catch (error) {
        res.status(500).json(error)
    }*/
}

exports.getMyConversations = async (req, res) => {

}