const redis = require('../redis');

/** @param {number | string} id - users id */
const getEmail = (id) => {
    return new Promise((resolve, reject) => {
        redis.hget(`USER:${id}`, 'email', (err, replies) => {
            if (err) { reject({status: 500, error: err}) }
            resolve(replies)
        })
    })
}

/** @param {number | string} id - users id */
const getUser = (id) => {
    return new Promise((resolve, reject) => {
        redis.HGETALL(`USER:${id}`, (err, replies) => {
            if (err) { reject({status: 500, error: err}) }
            resolve(replies)
        })
    })
}

/** 
 * @param {number | string} id - users id
 * @param {import('../../types/user').UsersObj} data - data to be updated
 * */
const updateUser = (id, data) => {
    return new Promise((resolve, reject) => {
        redis.HMSET(`USER:${id}`, data, (err, replies) => {
            if (err) { reject({status: 500, error: err}) }
            resolve(replies)
        })
    })
}

/** 
 * Delete a users cached data and email key value
 * @param {number | string} id - users id
 * @param {string} email - users email
 * */
const deleteUser = (id, email) => {
    return new Promise((resolve, reject) => {
        redis.MULTI()
        .DEL(`USER:${id}`)
        .HDEL(`USER:AUTH`, email)
        .EXEC((err, replies) => {
            if (err) { reject({status: 500, error: err}) }
            resolve(replies)
        })
    })
}

module.exports = {
    getEmail,
    getUser,
    updateUser,
    deleteUser
}