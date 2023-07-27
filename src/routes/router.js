const express = require('express')
const router = require('express').Router();
const createTorta = require('../controllers/tortasController')
const upload = require('../controllers/tortasController')


router.post('/agregartorta', upload.upload, createTorta.createTorta)

module.exports = router