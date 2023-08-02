const express = require('express')
const app = express()
const loretoIdeasDB = require('./src/services/conexion')
const cors = require('cors')
const router = require('./src/routes/router')

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/',router)

const server = app.listen(port, () => {
  console.log("Servidor ejecutandose correctamente", port);
  conexion()
});

const conexion = async () => { await loretoIdeasDB(); }