var should = require('chai').should();
var request = require('supertest');
var mongoose = require('mongoose');

var app = require('../../app/app.js');
var agent = request.agent(app);


    // get users
    describe('GET /asdasd', function() {
      it('returns a html page that is base', function(done) {
        agent
        .get('/asdasd')
        .expect(404)
        //.expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.should.have.property('status', 404);
          done();
        });
      });
    });