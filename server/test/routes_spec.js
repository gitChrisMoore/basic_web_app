var supertest = require("supertest");
var assert = require('assertthat');

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("SAMPLE unit test",function(){

  // #1 assert return home page

  it("assert return home page",function(done){

    // calling home page api
    server
    .get("/")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status assert be 200
      assert.that(res.status).is.equalTo(200);
      //.assert.equal(200);
      // Error key assert be false.
      //assert.that(res.body).is.equalTo("test");
      //res.body.error.assert.equal(false);
      done();
    });
  });

});