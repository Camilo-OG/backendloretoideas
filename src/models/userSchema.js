const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    require: [true, "El nombre es requerido"],
  },
  apellido: {
    type: String,
    require: [true, "El apellido es requerido"],
  },
  username: {
    type: String,
    unique: true,
    require: [true, "El usuario es requerido"],
  },
  password: {
    type: String,
    require: [true, "La contraseña es requerida"],
    match: /^[a-zA-Z0-9_]+$/
  }
});


const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
