## Winston Diagnostic Context

This package configures Winston to include the requestId into every log entry.
It does so by relying on getRequestID API provided by express-diagnostic-context package.

Example of resulting log entries:
```
info: boo requestId=da39b598-c164-40c3-8bc3-e2b14d7fad18
```
