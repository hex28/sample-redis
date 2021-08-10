# Sample Redis Cache

This is a sample CRUD api to demonstrate simple caching built using Node.js, Express, and Redis.

### Usage

```sh
$ npm install
```

```sh
# Run this script to quickly populate redis with some fake data.
$ npm run fake-data
```

```sh
$ npm start
# Or run with Nodemon

# Visit http://localhost:8080
```

```sh
# To flush all redis data run either commands in redis-cli
$ flushdb
$ flushall

# For more info visit https://redis.io/
```

### Redis

Open ".env" and add your Redis port and host. Adding a password is optional.