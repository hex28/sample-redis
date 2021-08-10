const redis = require('../redis');
const { getLastId } = require('./utility');


/**
 * 
 * Function will register a new user with a new id into redis. New ids are generated as follows:
 * - Get the last recorded number from cached key LAST_ID
 * - parse id to number and add 1
 * - Use the new number as the id
 * 
 * 
 * NOTE: As this is a sample, passwords are not hashed.
 * Passwords should always be hashed before being saved.
 * 
 * @param {import('../../types/user').CompleteUsersObj} userObj
 */
const registerUser = (userObj) => {
    return new Promise(async (resolve, reject) => {
        try {
            let lastId = await getLastId()
            let newId = parseInt(lastId) + 1
            let multi = redis.MULTI()
            multi.HMSET(`USER:${newId}`, userObj)
            multi.HMSET(`USER:AUTH`, userObj.email, newId)
            multi.INCRBY("LAST_ID", 1)
            multi.EXEC((err, replies) => {
                if (err) { reject({status: 500, error: error}) }
                resolve()
            })
        } catch (error) {
            reject({status: 500, error: error})
        }
    })
}


/** @param {string} email */
const login = (email) => {
    return new Promise((resolve, reject) => {
        redis.HMGET(`USER:AUTH`, email, (err, replies) => {
            if (err) { reject({status: 500, error: error}) }
            resolve(replies[0])
        })
    })
}

module.exports = {
    login,
    registerUser
}