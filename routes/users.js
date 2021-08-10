var express = require('express');
var router = express.Router();
const UserController = require('../controller/users');

router.route('/:id')
    .get(UserController.getUser)
    .patch(UserController.updateUser)
    .delete(UserController.deleteUser)

router.get('/', (req, res) => {
    res.send({status: 200, message: 'Sample Redis route for users is working'})
})


module.exports = router