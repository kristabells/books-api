const server = require('../../app');
const request = require('supertest');
const chai = require('chai');

describe('GET /health', () => {
    it('should respond with status UP', (done) => {
        request(server)
            .get('/health')
            .expect(200)
            .end((err, res) => {
                chai.expect(res.body).to.include({status: 'UP'});
            });
        done()
    });
});