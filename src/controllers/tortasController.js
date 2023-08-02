const TortasModel = require("../models/tortasSchema");
const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../../React-LoretoIdeas/public/img'),
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
  await TortasModel.create(torta);
  res.status(200).json({ msg: `${nombre} ha sido creado exitosamente`})
  console.log(`${nombre} ha sido creado exitosamente`)
  } catch (err) {
    res.status(400).json({msg: "El producto no se ha podido agregar", err})
    console.log("error", {msg: err})
  }
};

exports.mostrarTortas = async (req , res) => {
  try {
    const listaTortas = await TortasModel.find();
    res.status(200).json(listaTortas)
  } catch (error) {
    console.log(error)
    res.status(400).json({msg: error})
  }
}

exports.modifyStatus = async(req , res) => {
  const idConsultada = req.params.id;
  const estado = req.body.status
  const tortaId = await TortasModel.findOne({_id: idConsultada } )

  if( tortaId !== null ){
    
  await TortasModel.updateOne({_id: idConsultada },{status: estado })
    res.status(200).json({msg: "registro actualizado correctamente"})
    console.log('registro actualizado correctamente')
  } else {
    res.status(400).json({msg: `No se encontro el registro con id: ${idConsultada}`})
    console.log('no se encontro el registro')
  }
}

exports.modifyFull = async(req, res) => {
  const idConsultada = req.params.id;
  const tortaId = await TortasModel.findOne({_id: idConsultada } )
  if( tortaId !== null ){
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
    } else {
    const torta = {
      nombre: nombre,
      descripcion: descripcion,
      porciones: porciones,
      precio: precio,
      imagen: imagen,
      img_descripcion: img_descripcion
    };
    await TortasModel.updateOne({_id: idConsultada }, torta)
    res.status(200).json({msg: "registro actualizado correctamente"})
    console.log('registro actualizado correctamente')} 
  } else{
    res.status(400).json({msg: `No se encontro el registro con id: ${idConsultada}`})
    console.log('no se encontro el registro')
    } 
}


