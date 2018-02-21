"use strict";
let router = require('express').Router(),
    ctrlProject = require(DIR_ROOT + '/controller/project');

module.exports = router.get('/', (req, res, next) => {
		console.log('fsdfs');
    res.send( '<h1 style="color:green">API/PROJECT</h1>' );
})
.get('/listAll', (req, res) => {
    new ctrlProject(req, res, "listAll");
})
.get('/list', (req, res) => {
    new ctrlProject(req, res, "list");
})
.post('/add', (req, res) => {
    new ctrlProject(req, res, "add");
})
.post('/edit', (req, res) => {
    new ctrlProject(req, res, "edit");
})
.post('/delete', (req, res) => {
    new ctrlProject(req, res, "delete");
})
.get('/assignPM', (req, res) => {
    new ctrlProject(req, res, "getPM");
})
.get('/assignSuperv', (req, res) => {
    new ctrlProject(req, res, "getSuper");
})
.get('/assignDev', (req, res) => {
    new ctrlProject(req, res, "getDev");
})
.post('/assignPM', (req, res) => {
    new ctrlProject(req, res, "assignPM");
})
.post('/assignSuperv', (req, res) => {
    new ctrlProject(req, res, "assignSuper");
})
.post('/assignDev', (req, res) => {
    new ctrlProject(req, res, "assignDev");
})
.get('/searchUser', (req, res) => {
    new ctrlProject(req, res, "searchUser");
})

