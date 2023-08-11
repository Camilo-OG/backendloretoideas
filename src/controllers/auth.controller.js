const express = require("express");
const User = require("../schemas/user.model");
const bcrypt = require("bcryptjs");
const createAccesToken = require("../libs/jwt");

exports.register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const passwordHashs = await bcrypt.hash(password, 10); //encriptamos la contraseña con 10 ejecuciones
    const newUser = new User({
      username,
      email,
      password: passwordHashs,
    });
    const userSaved = await newUser.save();
    const token = await createAccesToken({ id: userSaved._id });

    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updateAt: userSaved.updatedAt,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.login = (req, res) => {
  console.log(req.body);
  res.send("saludo desde el login");
};
