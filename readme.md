## Winston Diagnostic Context

This package configures Winston to include the requestId and sessionId into every log entry.
It does so by relying on getRequestID and getSessionID APIs provided by express-diagnostic-context package.

Setup:

```
require('winston-diagnostic-context')(winston);
```
Now, 
```
winston.info('boo') will 
```

will print

```
info: boo requestId=da39b598-c164-40c3-8bc3-e2b14d7fad18 sessionId=easb334-b4564-ff78-8bc3-73535ceda5334
```
