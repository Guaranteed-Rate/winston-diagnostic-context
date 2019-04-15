# DON'T USE, OUT OF DATE VERSION OF REQUEST WITH VULNERABILITY


## Winston Diagnostic Context

This package configures Winston to include the requestId and sessionId into every log entry.
It does so by relying on getRequestID and getSessionID APIs provided by [express-diagnostic-context](https://github.com/Guaranteed-Rate/express-diagnostic-context) package.

LIMITATION:
In certain situations, Node will loose the the context, but this can be worked around by using edc.bind() api. 
Please see the [documenation](https://github.com/Guaranteed-Rate/express-diagnostic-context#caveat).

Setup:

```
var edc = require('express-diagnostic-context');
require('winston-diagnostic-context')(winston);

var app = express();
app.use(function(req, res, next) {
    //OR use https://github.com/Guaranteed-Rate/request-stitching-middleware to get these from request
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

```
Now, 
```
winston.info('boo'); 
```

will print

```
info: boo requestId=da39b598-c164-40c3-8bc3-e2b14d7fad18 sessionId=easb334-b4564-ff78-8bc3-73535ceda5334
```
