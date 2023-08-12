const express = require("express");
const router = require("express").Router();
const tartaletasController = require("../controllers/tartaletasController");
const tortasController = require("../controllers/tortasController");
const authController = require("../controllers/auth.controller");
const {authRequired}= require("../middlewares/validateToken")



/* Rutas Tortas */
router.post("/agregartorta", tortasController.upload, tortasController.createTorta);
router.get("/mostrar", tortasController.mostrarTortas);
router.get("/torta/mostraruno/:id", tortasController.findOne);
router.put("/modificar/:id", tortasController.modifyStatus);
router.put("/modificarfull/:id", tortasController.upload, tortasController.modifyFull);

/* Rutas Tartaletas */
router.post("/tartaleta/agregartartaleta", tartaletasController.upload,  tartaletasController.createTartaleta);
router.get("/tartaleta/mostrartartaletas", tartaletasController. mostrarTartaletas);
router.get("/tartaleta/mostraruno/:id", tartaletasController.findOne);
router.put("/tartaleta/modificartartaleta/:id", tartaletasController.modificarStatus);
router.put("/tartaleta/modificartartaletafull/:id", tartaletasController.upload, tartaletasController.modificarTotal);



//! Rutas Login
router.post("/register", authController.register);
router.get("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/administrador",authRequired, authController.administrador);



module.exports=router;
