const server = require('../../../app');
const request = require('supertest');

describe('GET /api/health', () => {
    it('should respond with status UP', (done) => {
        request(server)
            .get('/api/health')
            .expect(200)
            .end((err, res) => {
                res.body.should.deepEqual({status: 'UP'});
            });
        done()
    });
});