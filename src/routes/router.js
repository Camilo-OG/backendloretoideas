const express = require("express");
const router = require("express").Router();
const tartaletasController = require("../controllers/tartaletasController");
const tortasController = require("../controllers/tortasController");
const authController = require("../controllers/auth.controller");

router.post(
  "/agregartorta",
  tortasController.upload,
  tortasController.createTorta
);
router.get("/mostrar", tortasController.mostrarTortas);
router.put("/modificar/:id", tortasController.modifyStatus);
router.put(
  "/modificarfull/:id",
  tortasController.upload,
  tortasController.modifyFull
);

router.post(
  "/tartaleta/agregartartaleta",
  tartaletasController.upload,
  tartaletasController.createTartaleta
);
router.get(
  "/tartaleta/mostrartartaletas",
  tartaletasController.mostrarTartaletas
);
router.put(
  "/tartaleta/modificartartaleta/:id",
  tartaletasController.modificarStatus
);
router.put(
  "/tartaleta/modificartartaletafull/:id",
  tartaletasController.upload,
  tartaletasController.modificarTotal
);

//! Rutas Login
router.post("/register", authController.register);
router.get("/login", authController.login);

module.exports = router;
