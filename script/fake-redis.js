/**
 * Script to populate redis with fake data
 */

require('dotenv').config()

const redis = require("redis");

const client = redis.createClient({
    port      : process.env.REDIS_PORT,
    host      : process.env.REDIS_HOST,
    //password  : 'password' //password is optional
});

client.MULTI()
.HMSET(
    `USER:1`, 
    {
        email: 'test1@gmail.com',
        password: 'test123',
        firstName: 'Julian',
        lastName: 'Casablancas'
    }
)
.HMSET(`USER:AUTH`, 'test1@gmail.com', 1)
.HMSET(
    `USER:2`, 
    {
        email: 'test2@gmail.com',
        password: 'test123',
        firstName: 'Isaac',
        lastName: 'Brock'
    }
)
.HMSET(`USER:AUTH`, 'test2@gmail.com', 2)
.HMSET(
    `USER:3`, 
    {
        email: 'test3@gmail.com',
        password: 'test123',
        firstName: 'Jack',
        lastName: 'White'
    }
)
.HMSET(`USER:AUTH`, 'test3@gmail.com', 3)
.HMSET(
    `USER:4`, 
    {
        email: 'test4@gmail.com',
        password: 'test123',
        firstName: 'Patrick',
        lastName: 'Carney'
    }
)
.HMSET(`USER:AUTH`, 'test4@gmail.com', 4)
.HMSET(
    `USER:5`, 
    {
        email: 'test5@gmail.com',
        password: 'test123',
        firstName: 'Claudio',
        lastName: 'Sanchez'
    }
)
.HMSET(`USER:AUTH`, 'test5@gmail.com', 5)
.HMSET(
    `USER:6`, 
    {
        email: 'test6@gmail.com',
        password: 'test123',
        firstName: 'Alex',
        lastName: 'Turner'
    }
)
.HMSET(`USER:AUTH`, 'test6@gmail.com', 6)
.SET(`LAST_ID`, '6')
.EXEC((err, replies) => {
    process.exit()
})
