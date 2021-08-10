const redisUser = require('../libs/redis/users');
const { dataSanitizer, publicDataSanitizer } = require('../libs/sanitize');

const deleteUser = async (req, res) => {
    const {id} = req.params
    try {
        let email = await redisUser.getEmail(id)
        await redisUser.deleteUser(id, email)
        res.status(204).send({result: 'User deleted'})
    } catch ({status, error}) {
        res.status(status).send({error: error})
    }

}

const getUser = async (req, res) => {
    const {id} = req.params
    if(!id) {
        res.send({status: 400, error: 'Missing ID'})
        return;
    }

    try {
        let user = await redisUser.getUser(id)
        if (user == null) {
            throw {status: 404, error: "User not found"}
        }
        res.send({
            data: publicDataSanitizer(user)
        })
    } catch ({status, error}) {
        res.status(status).send({error: error})
    }
}

const updateUser = async (req, res) => {
    const {id} = req.params

    try {
        const sanitizedData = dataSanitizer(req.body, 'users')
        await redisUser.updateUser(id, sanitizedData)
        res.send({message: "User Updated"})
    } catch ({status, error}) {
        res.status(status).send({error: error})
    }

}


module.exports = {
    deleteUser,
    getUser,
    updateUser
}