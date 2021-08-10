const redis = require("redis");

const client = redis.createClient({
    port      : process.env.REDIS_PORT,
    host      : process.env.REDIS_HOST,
    //password  : process.env.REDIS_PASSWORD //password is optional
});

client.on('connect', function() {
  console.log('Redis Database connected on port: ' + 6379);
});

client.on('reconnecting', function() {
  console.log('Redis client reconnecting');
});

client.on('error', function (err) {
  console.log('Something went wrong ' + err);
});


module.exports = client;