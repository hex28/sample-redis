var express = require('express');
var router = express.Router();
const AuthController = require('../controller/auth');

router.post('/login', AuthController.login);

router.post('/register', AuthController.registerUser);

router.get('/', (req, res) => {
    res.send({status: 200, message: 'Sample Redis route is working!'})
})


module.exports = router