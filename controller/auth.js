const crypto = require('../libs/crypto');
const redisAuth = require('../libs/redis/auth');
const redisUser = require('../libs/redis/users');
const { dataSanitizer, publicDataSanitizer } = require('../libs/sanitize');

const registerUser = async (req, res) => {
    try {
        let sanitizedData = dataSanitizer(req.body)
        await redisAuth.registerUser(sanitizedData)
        res.send({result: "User Registered"})
    } catch ({status, error}) {
        res.status(status).send({error: error})
    }
}

const login = async (req, res) => {
    try {
        let {email, password} = dataSanitizer(req.body, 'auth')
        let id = await redisAuth.login(email)
        if (id === null) {
            throw {status: 404, error: "User does not exist"}
        }
        let user = await redisUser.getUser(id)
        if (user.password !== password) {
            throw {status: 400, "error": "Wrong password for account"}
        }
        let token = crypto.randomString(15)
        res.send({token: token, data: publicDataSanitizer(user)})
        return
    } catch ({status, error}) {
        res.status(status).send({error: error})
    }
}


module.exports = {
    login,
    registerUser
}