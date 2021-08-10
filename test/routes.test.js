const prevProcess = process.env
process.env.REDIS_PORT = 6379
process.env.REDIS_HOST = "127.0.0.1"


const request = require("supertest");
const express = require('express');
const redis = require('../libs/redis');
const app = require('../routes');

afterAll((done) => {
    process.env = prevProcess
    redis.quit(done);
});

describe("route /", () => {

    const request = require("supertest");
    const express = require('express');
    const redis = require('../libs/redis');
    const app = require('../routes');

    test("GET /", () => {
      return request(app)
        .get("/")
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
    });

    test("POST /login", () => {
        return request(app)
        .post('/login')
        .send({email: "test@gmail.com", password: "yess"})
        .then(response => {
            expect(response.statusCode).toBe(200)
        })
    })

    test("POST /login will return 404 if user not found", () => {
        return request(app)
        .post('/login')
        .send({email: 'test123@gmail.com', password: "pass"})
        .then(response => {
            expect(response.statusCode).toBe(404)
        })
    })

    test("POST /login will return 400 if password is wrong", () => {
        return request(app)
        .post('/login')
        .send({email: 'test@gmail.com', password: "yesss"})
        .then(response => {
            expect(response.statusCode).toBe(400)
        })
    })

});

describe("route /users", () => {

    test("Get /users/:id", ()=> {
        return request(app)
        .get("/users/3")
        .then(response => {
            expect(response.statusCode).toBe(200)
        })
    })

    test("Get /users/:id user not in cache", () => {
        return (request(app))
        .get("/users/2000")
        .then(response => {
            expect(response.statusCode).toBe(404)
        })
    })
})