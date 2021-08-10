const redis = require('../redis');

const getLastId = () => {
    return new Promise((resolve, reject) => {
        redis.GET(`LAST_ID`, (err, replies) => {
            if (err) { reject(err) }
            resolve(replies)
        })
    })
}


module.exports = {
    getLastId
}