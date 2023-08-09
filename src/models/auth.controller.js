const express = require('express');
const userModel= require("../schemas/user.model")


const register= (req,res)=>{res.send({msg: "saludo desde el registro"}
    )}
 const login= (req,res)=>{{res.send({msg: "saludo desde el login"}
 )}}

 module.exports={register,login}