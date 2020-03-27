const request = require("supertest");

const server = require("./server.js")

describe('server.js', function(){
    describe('GET /', function(){

        it('should return 200 ok', function(){
            return request(server)
            .get("/")
            .expect(200);
        })

        it('should return JSON', function(){
            return request(server)
            .get("/")
            .type('application/json')
        })

        it('should return JSON', function(){
            return request(server).get("/").then(res => {
                expect(res.type).toMatch(/json/i)
            })
        })

        it('should respond with { api: "up" }', function(){;
        return request(server)
        .get("/")
        .expect('{"api":"up"}')
        })

        it('should respond with { api: "up" }', function(){;
            return request(server).get("/").then(res => {
                expect(res.body.api).toBe("up");
            })
        })
        
    });

    describe('POST /hobbits', function(){

        it('Should return with a status 201', async function(){
            const res = await request(server)
            .post('/hobbits')
            .send({ name: 'bobby' })
            expect(res.status).toBe(201);
        });

        it('Should return an object', async function(){
            const res = await request(server)
            .post('/hobbits')
            .send({ name: 'bobby' })
            expect(typeof res.body).toBe("object")
        })
    })

    describe('GET /hobbits', function(){

        it('Should return with a status 200', async function(){
            const res = await request(server)
            .get('/hobbits')
            expect(res.status).toBe(200)
        })

        it('Should return with JSON', async function(){
            const res = await request(server)
            .get("/hobbits")
            expect(res.type).toMatch(/json/i)
        })
    })

    describe('DELETE /hobbits/:id', function(){

        it('Should return with a status 200', async function(){
            const res = await request(server)
            .delete('/hobbits/1')
            expect(res.status).toBe(200)
        })

        it('Should return correct count after deleting object', async function(){
            const res = await request(server)
            .delete('/hobbits/3')
            expect(res.body).toStrictEqual({"count": 1})
        })
    })
});