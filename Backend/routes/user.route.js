const express = require('express')
const userCont = require('../controllers/user.controller.js')
const {signup, login, editUser, getUserById, getAllUsers, getClients} = userCont;
const {userAuth, saveUser, checkLogin} = require('../middleware/userAuth.js')

const router = express.Router();

router.post('/signup',saveUser ,signup)

router.post('/login',login, login)

router.put('/edit/:userId', editUser)



router.get('/', getAllUsers) 

router.get('/clients', getClients) 
router.get('/:userId', getUserById) 
 
module.exports = router 
