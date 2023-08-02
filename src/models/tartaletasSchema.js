const mongoose = require("mongoose");

const tartaletasSchema = new mongoose.Schema({
  nombre: {
    type: String,
    require: [true, "El nombre requerido"],
  },
  descripcion: {
    type: String,
    require: [true, "La descripcion es requerida"],
  },
  diametro: {
    type: String,
    require: [true, "El diametro es requerido"],
  },
  precio: {
    type: String,
    require: [true, "El precio es requerido"],
  },
  status: {
    type: String,
    require: true,
    default: "ACTIVO",
    emun: ["ACTIVO", "INACTIVO"],
  },
  imagen: {
    type: String,
    require: [true, "La imagen es requerida"],
  },
  img_descripcion: {
    type: String,
    require: [true, "La descripcion de la imagen es requerida"],
  }
});

// con el schema creamos el modelo

const TartaletasModel = mongoose.model("Tartaleta", tartaletasSchema);

module.exports = TartaletasModel;
