const express = require("express");
const User = require("../schemas/user.model");

exports.register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const newUser = new User({
      username,
      email,
      password,
    });
    const userSaved=await newUser.save();
res.json(userSaved)
  } catch (error) {
    console.log(error);
  }

  res.send("registrando");
};

exports.login = (req, res) => {
  console.log(req.body);
  res.send("saludo desde el login");
};
