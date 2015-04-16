'use strict';

var edc = require('express-diagnostic-context');
var test = require('tap').test;
var winston = require('winston');
var http    = require('http');
var express = require('express');
var request = require('request');


test("requestId and sessionId should be included in the log output", function (t) {
  t.plan(5);

    //set up winston for testing
    winston.remove(winston.transports.Console);
    winston.add(winston.transports.Memory);

    //code under test
    require('../wdc.js')(winston);
    var memLogger = winston.default.transports['memory'];


    var app = express();
    app.use(function(req, res, next) {
        //setup the values
        req.requestId = 'reqId111';
        req.sessionId = 'sessId111';
        next();
    });

    app.use(edc.middleware());

    app.get('/THUNDAR', function (req, res) {
      winston.info('boo');
      res.send({status : 'ok'});
      res.end();
    });

    var server = http.createServer(app).listen(8080, function () {
      request('http://localhost:8080/THUNDAR',
              {json : true},
              function (error, res, body) {
        t.notOk(error, "no error found");
        t.equal(res.statusCode, 200, "got OK response");
        t.deepEqual(body, {status : 'ok'}, "body was as expected");
        server.close();


        t.assert(memLogger.writeOutput.length == 1);
        t.equal(memLogger.writeOutput[0], "info: boo requestId=reqId111, sessionId=sessId111");

      });
    });

  });

