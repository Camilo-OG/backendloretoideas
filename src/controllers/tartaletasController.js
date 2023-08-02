const TartaletasModel = require("../models/tortasSchema");
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../../React-LoretoIdeas/public/uploads'),
  filename: (req, file, cb) => {
    cb(null,`${file.originalname}`)
  }
})
const upload = multer({storage: storage})
exports.upload = upload.single('imagen')

exports.createTartaleta = async (req, res) => {
  const imagen = req.file.originalname  
  const {
    nombre,
    descripcion,
    diametro,
    precio,
    img_descripcion,
  } = req.body;
  if( !nombre || !descripcion || !diametro || !precio || !imagen || !img_descripcion) {
    return res.status(400).json({msg: "todos los campos son obligatorios"})
  }
  const tartaleta = {
    nombre: nombre,
    descripcion: descripcion,
    diametro: diametro,
    precio: precio,
    imagen: imagen,
    img_descripcion: img_descripcion
  };
  try{
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
    const imagen = req.file.originalname  
    const {
      nombre,
      descripcion,
      diametro,
      precio,
      img_descripcion,
    } = req.body;

    if( !nombre || !descripcion || !diametro || !precio || !imagen || !img_descripcion) {
      return res.status(400).json({msg: "todos los campos son obligatorios"})
    } else {
    const tartaleta = {
      nombre: nombre,
      descripcion: descripcion,
      diametro: diametro,
      precio: precio,
      imagen: imagen,
      img_descripcion: img_descripcion
    };
    await TartaletasModel.updateOne({_id: idConsultada }, tartaleta)
    res.status(200).json({msg: "registro actualizado correctamente"})
    console.log('registro actualizado correctamente')} 
  } else{
    res.status(400).json({msg: `No se encontro el registro con id: ${idConsultada}`})
    console.log('no se encontro el registro')
    } 
}