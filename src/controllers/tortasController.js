const tortasModel = require("../models/tortasSchema");
const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../uploads'),
  filename: (req, file, cb) => {
    cb(null,`${file.originalname}`)
  }
})
const upload = multer({storage: storage})

exports.upload = upload.single('imagen')

exports.createTorta = async (req, res) => {

  const imagen = req.file.originalname
  
  const {
    nombre,
    descripcion,
    porciones,
    precio,
    img_descripcion,
  } = req.body;


  if( !nombre || !descripcion || !imagen || !img_descripcion) {
    return res.status(400).json({msg: "todos los campos son obligatorios"})
  }

  const torta = {
    nombre: nombre,
    descripcion: descripcion,
    porciones: porciones,
    precio: precio,
    imagen: imagen,
    img_descripcion: img_descripcion
  };
  try{
  await tortasModel.create(torta);
  res.status(200).json({ msg: `${nombre} ha sido creado exitosamente`})
  console.log(`${nombre} ha sido creado exitosamente`)
  } catch (err) {
    res.status(400).json({msg: "El producto no se ha podido agregar", err})
    console.log("error", {msg: err})
  }
};


