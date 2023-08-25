const TartaletasModel = require("../models/tartaletasSchema");
const multer = require('multer')
const path = require('path');
require('dotenv').config();

const url = process.env.IMAGE_URL

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/img'),
  filename: (req, file, cb) => {
    cb(null,`${file.originalname}`)
  }
})
const upload = multer({storage: storage})

exports.upload = upload.single('imagen')


exports.createTartaleta = async (req, res) => {
  
   
  const {
    nombre,
    descripcion,
    diametro,
    precio,
    img_descripcion,
  } = req.body;
  if( !nombre || !descripcion || !diametro || !precio || !img_descripcion) {
    return res.status(400).json({msg: "todos los campos son obligatorios"})
  }
  
  try{
    const tartaleta = TartaletasModel({
      nombre: nombre,
      descripcion: descripcion,
      diametro: diametro,
      precio: precio,
      img_descripcion: img_descripcion
    });
    if(req.file){
    const imagen = req.file.originalname;
    tartaleta.setImagen(imagen)
    } 
  await TartaletasModel.create(tartaleta);
  res.status(200).json({ msg: `${nombre} ha sido creado exitosamente`})
  console.log(`${nombre} ha sido creado exitosamente`)
  } catch (err) {
    res.status(400).json({msg: "El producto no se ha podido agregar", err})
    console.log("error", {msg: err})
  }
};

exports.mostrarTartaletas = async (req , res) => {
  try {
    const listaTartaletas = await TartaletasModel.find();
    res.status(200).json(listaTartaletas)
  } catch (error) {
    console.log(error)
    res.status(400).json({msg: error})
  }
}

exports.modificarStatus = async(req , res) => {
  const idConsultada = req.params.id;
  const estado = req.body.status
  const tartaletaId = await TartaletasModel.findOne({_id: idConsultada } )

  if( tartaletaId !== null ){
    
  await TartaletasModel.updateOne({_id: idConsultada },{status: estado })
    res.status(200).json({msg: "registro actualizado correctamente"})
    console.log('registro actualizado correctamente')
  } else {
    res.status(400).json({msg: `No se encontro el registro con id: ${idConsultada}`})
    console.log('no se encontro el registro')
  }
}

exports.modificarTotal = async(req, res) => {
  const idConsultada = req.params.id;
  const tartaletaId = await TartaletasModel.findOne({_id: idConsultada } )
  if( tartaletaId !== null ){
      
    const {
      nombre,
      descripcion,
      diametro,
      precio,
      img_descripcion,
    } = req.body;

    if( !nombre || !descripcion || !diametro || !precio || !img_descripcion) {
      return res.status(400).json({msg: "todos los campos son obligatorios"})
    } else {
    const tartaleta = TartaletasModel({
      nombre: nombre,
      descripcion: descripcion,
      diametro: diametro,
      precio: precio,
      img_descripcion: img_descripcion
    });
    if(req.file){
      const imagen = req.file.originalname;
      tartaleta.imagen = `${url}${imagen}`
    }

    await TartaletasModel.updateOne({_id: idConsultada }, tartaleta)
    res.status(200).json({msg: "registro actualizado correctamente"})
    console.log('registro actualizado correctamente')} 
  } else{
    res.status(400).json({msg: `No se encontro el registro con id: ${idConsultada}`})
    console.log('no se encontro el registro')
    } 
}

exports.findOne = async (req, res) => {
  const idConsultada = req.params.id
  try {
  const tartaletaId = await TartaletasModel.findOne({_id: idConsultada } )
  if( tartaletaId !== null ){
    res.status(200).json(tartaletaId)
    console.log('registro encontrado con exito')
  } else {
    res.status(400).json({msg: `No se encontro el registro con id: ${idConsultada}`})
    console.log('no se encontro el registro')
  }
  } catch (error) {
    console.error('Error al buscar el registro:', error);
    res.status(500).json({ msg: 'Ocurrió un error en el servidor' });
  }
}