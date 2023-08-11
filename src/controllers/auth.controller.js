const express = require("express");
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
    try {
      const userSaved = await User.create(user);
      const token = await createAccesToken({ id: userSaved._id });
   res.cookie("token", token);

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updateAt: userSaved.updatedAt,
    });


      res.status(200).json({ message: "funcionando" });
    } catch (error) {
      res.status(400).json({ message: "error 400 nuevo trycatch" });

    }

 
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error 400" });
  }
};

exports.login = (req, res) => {
  console.log(req.body);
  res.send("saludo desde el login");
};
