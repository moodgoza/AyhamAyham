// routes/messages.js
const express = require('express');
const router = express.Router();
const messagesCont = require('../controllers/message.controller.js')
const { getMessages, sendMessage, getMessagesForUser } = messagesCont 

router.get('/messages',  messagesCont.getMessages);
router.post('/messages',  messagesCont.sendMessage);
router.get('/messages/:senderId/:receiverId', messagesCont.getMessagesForUser);
router.get('/messages/by/:userId', messagesCont.getUniqueUsersByUser);
module.exports = router;

