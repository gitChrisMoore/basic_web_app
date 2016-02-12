var should = require('chai').should();
var request = require('supertest');
var mongoose = require('mongoose');
var app = require('../app/app.js');
var agent = request.agent(app);

//
var ver1 = '/api/v1'



    // get users
    describe('GET: ' + ver1 + '/amwayio/circuits/ 200 array', function() {

      it('It should return a 200 OK message and a array', function(done) {
        agent
        .get(ver1 + '/amwayio/circuits/')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.should.have.property('status', 200)
          res.body.should.be.a('array');
          done();
        });
      });
    
    });
