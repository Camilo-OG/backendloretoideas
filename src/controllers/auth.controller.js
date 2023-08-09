const express = require('express');
const userModel= require("../schemas/user.model")

exports.register= async(req,res)=>{{res.send({msg: "saludo desde el register"})}};
 exports.login= async(req,res)=>{{res.send({msg: "saludo desde el login"}
 )}}

