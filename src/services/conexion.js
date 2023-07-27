const mongoose = require('mongoose')


const loretoIdeasDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/loretoideas');
    console.log("Conexion exitosa a la base de datos Loreto Ideas");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la base de datos", error);
  }
};

module.exports = loretoIdeasDB