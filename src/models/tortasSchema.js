const mongoose = require("mongoose");

const tortasSchema = new mongoose.Schema({
  nombre: {
    type: String,
    require: [true, "El nombre requerido"],
  },
  descripcion: {
    type: String,
    require: [true, "La descripcion es requerida"],
  },
  porciones: [ String ],
  precio: [ String ],
  status: {
    type: String,
    require: true,
    default: "ACTIVO",
    enum: ["ACTIVO", "INACTIVO"],
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



const tortasModel = mongoose.model("torta", tortasSchema);

module.exports = tortasModel;
