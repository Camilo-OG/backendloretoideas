const express = require('express')
const router = require('express').Router();

const tortasController = require('../controllers/tortasController')


router.post('/agregartorta', tortasController.upload, tortasController.createTorta)

router.get('/mostrar', tortasController.mostrarTortas)

router.put('/modificar/:id', tortasController.modifyStatus)

router.put('/modificarfull/:id', tortasController.upload, tortasController.modifyFull)

module.exports = router