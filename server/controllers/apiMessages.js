const Message = require('../models/message.js')


exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.sendMessage = async (req, res) => {
    console.log(req.body.convesrationId)
    const newMessage = new Message({
        convesrationId: req.body.convesrationId,
        sender: req.user.id,
        text: req.body.text
    });
    try {
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage)
    } catch (error) {
        res.status(400).json(error)
    }  
}

exports.getConversationMessages = async (req, res) => {
    try {
        console.log('Messages')
        const conversationId = req.params.conversationId
        const messages = await Message.find({
            conversationId: conversationId
        });
        res.status(200).json(messages)
    } catch (error) {
        res.status(400).json(error)
    }
}