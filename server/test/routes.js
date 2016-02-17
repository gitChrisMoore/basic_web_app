var should = require('chai').should();
var request = require('supertest');
var mongoose = require('mongoose');
var app = require('../app/app.js');
var agent = request.agent(app);

//
var ver1 = '/api/v1'
var testID = ''



    // get users
    describe('GET: ' + ver1 + '/amwayio/circuits/ ', function() {

      it('This should return an array of objects', function(done) {
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


    // get users
    describe('Post: ' + ver1 + '/amwayio/circuits/ ', function() {

      it('This should create a blank object and return the object _id', function(done) {
        var object = {}
        agent
        .post(ver1 + '/amwayio/circuits/')
        .send(object)
        .expect(202)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.should.have.property('status', 202)
          res.body.should.have.property('_id')
          //res.body.should.be.a('array');
          testID = res.body._id
          done();
        });
      });
    
    });

    // get users

    var buildString = 'find?string={"_id":"' + testID  +'"}'

    describe('GET: ' + ver1 + '/amwayio/circuits/' + buildString, function() {

      it('This should return a single object from the previous get', function(done) {
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