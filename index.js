const express = require("express");
const app = express();
const loretoIdeasDB = require("./src/services/conexion");
const cors = require("cors");
const router = require("./src/routes/router");
const cookieParser = require("cookie-parser");

const port = 3000;
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://64e6760743746206779281b7--lustrous-starship-9bfc30.netlify.app"
  ],
  methods: ["GET", "POST", "PUT"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
};

app.use(cors(corsOptions));
app.use(cookieParser());
 
app.use("/", router);

const server = app.listen(port, () => {
  console.log("Servidor ejecutandose correctamente", port);
  conexion();
});

const conexion = async () => {
  await loretoIdeasDB();
};
