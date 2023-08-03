const UserModel = require("../models/userSchema");

exports.createUser = async (req, res) => {
  
  const {
    nombre,
    apellido,
    username,
    password
  } = req.body;
  
  if( !nombre || !apellido || !username || !password) {
    return res.status(400).json({msg: "todos los campos son obligatorios"})
  }
  const userConsultado = await UserModel.findOne({username: username })
  if(userConsultado == null){
    const user = {
      nombre: nombre,
      apellido: apellido,
      username: username,
      password: password
    };
    try{
    await UserModel.create(user);
    res.status(200).json({ msg: ` usuario ${username} ha sido creado exitosamente`})
    console.log(`${username} ha sido creado exitosamente`)
    } catch (err) {
      res.status(400).json({msg: "El usuario no se ha podido agregar", err})
      console.log("error", {msg: err})
    }
  } else {
    res.status(400).json({msg: "El username ya existe"})
  }
  
};

exports.showUsers = async (req , res) => {
  try {
    const userList = await UserModel.find();
    res.status(200).json(userList)
  } catch (error) {
    console.log(error)
    res.status(400).json({msg: error})
  }
}