const User = require("../schemas/user.model");
const bcrypt = require("bcryptjs");
const createAccesToken = require("../libs/jwt");

exports.register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const passwordHashs = await bcrypt.hash(password, 10); //encriptamos la contraseña con 10 ejecuciones
    // const newUser = new User({
    //   username,
    //   email,
    //   password: passwordHashs,
    // });
    const user = {
      username,
      email,
      password: passwordHashs,
    };
    const userSaved = await User.create(user);
    const token = await createAccesToken({ id: userSaved._id });
    res.cookie("token", token);

    res.status(200).json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updateAt: userSaved.updatedAt,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error 400" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = await createAccesToken({ id: userFound._id });
    res.cookie("token", token);

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updateAt: userFound.updatedAt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

exports.administrador = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound)
    return res.status(400).json({ message: "usuario no encontrado" });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updateAt: userFound.updateAt,
  });
};
