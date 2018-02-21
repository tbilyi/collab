"use strict";
let router = require('express').Router(),
    ctrlAuth = require(DIR_ROOT + '/controller/auth');

module.exports = router
.get('/', (req, res) => {
    res.send( '<h1 style="color:green">API/AUTH</h1>' );
})
.get('/checkUser', (req, res) => {
    let auth = new ctrlAuth(req, res);
    auth.checkUser();
})
.get('/logout', (req, res) => {
    let auth = new ctrlAuth(req, res);
    auth.logout();
})
.post('/login', (req, res) => {
    let auth = new ctrlAuth(req, res);
    auth.login();
})
.post('/register', (req, res) => {
    let auth = new ctrlAuth(req, res);
    auth.register();
});