const mongoose = require('mongoose')

require('dotenv').config();

const dbUrl = process.env.URL2

const loretoIdeasDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Conexion exitosa a la base de datos Loreto Ideas");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la base de datos", error);
  }
};

module.exports = loretoIdeasDB