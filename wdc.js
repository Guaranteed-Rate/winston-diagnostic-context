"use strict";

var edc = require('express-diagnostic-context');

module.exports = function(logger) {

    logger.addRewriter(function(level, msg, meta) {
        meta['requestId'] = edc.getRequestId();
        return meta;
    }); 
};