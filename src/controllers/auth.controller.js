const express = require('express');
const userModel= require("../schemas/user.model")


exports.register=async (req,res)=>{
try {
    const userlist= await userModel.find()
    res.status(200).json(userlist)
} catch (error) {
    console.log(error)
    res.status(400).json({msg: error})
}
}
 exports.login= async(req,res)=>{{res.send({msg: "saludo desde el login"}
 )}}

