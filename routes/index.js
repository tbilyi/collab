"use strict";
let router = require('express').Router(),
    config = require(DIR_ROOT + '/config/config_min.json'),
    logger = require('tracer').dailyfile({
        root:DIR_ROOT + '/log/request', maxLogFiles: 10
    });

module.exports = router
.get('/', (req, res, next) => {
    res.send( '<h1 style="color:green">API</h1>' );
})
.get('/test', (req, res, next) => {
    res.send( '<h1 style="color:red">TEST</h1>' );
});