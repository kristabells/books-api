const server = require('../../../app');
const request = require('supertest');
require('should');


describe('GET /api/books', () => {
    it('should respond with an object containing totalItems and books', (done) => {
        request(server)
            .get('/api/books')
            .expect(200).end((err, res) => {
                res.body.should.have.property('totalItems');
                res.body.should.have.property('books');
        });

        done()
    });
});