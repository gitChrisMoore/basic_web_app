var should = require('chai').should();
var request = require('supertest');
var mongoose = require('mongoose');
var app = require('../app/app.js');
var agent = request.agent(app);

//
var ver1 = '/api/v1';
var testID = '';



    // get users
    describe(ver1 + '/amwayio/circuits/ ' + 'CRUD Mongo Testing: ', function() {

      it('This should create a blank object and return the object _id', function(done) {
        var object = {};
        agent
        .post(ver1 + '/amwayio/circuits/')
        .send(object)
        .expect(202)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.should.have.property('status', 202);
          res.body.should.have.property('_id');
          //res.body.should.be.a('array');
          testID = res.body._id;
          done();
          console.log(testID);
        });
      }),

      it('This should return an array of objects', function(done) {
        agent
        .get(ver1 + '/amwayio/circuits/')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.should.have.property('status', 200);
          res.body.should.be.a('array');
          done();
        });
      }),

      it('This should return a single object in a array from the previous get', function(done) {
        console.log('This is outside the testing' + testID);

        var buildString = 'find?string={"_id":"' + testID  +'"}';

        agent
        .get(ver1 + '/amwayio/circuits/' + buildString)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.should.have.property('status', 200);
          res.body.should.be.a('array');
          done();
        });
      }),


      it('This should delete the object which was created in the previous tests', function(done) {
        
        var buildString = 'find?string={"_id":"' + testID  +'"}';

        agent
        .delete(ver1 + '/amwayio/circuits/' + testID)
        .expect(204)
        //.expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.should.have.property('status', 204);
          //res.body.should.be.a('array');
          testID = res.body._id;
          done();
        });
      });
    });