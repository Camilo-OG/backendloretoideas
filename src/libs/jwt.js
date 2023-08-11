require('dotenv').config();
const jwt = require("jsonwebtoken");
const tokenSecret=process.env.TOKEN_SECRET

const createAccesToken= payload =>{
return new Promise((resolve, reject) => {
  //resolve es cuando esta todo bien y el reject cuando hubo problemas
  jwt.sign(payload, tokenSecret, { expiresIn: "1d" }, (err, token) => {
    if (err) {
      reject(err);
    } else {
      res.status(500).json({ message: error.message })
    }
  })
})
}

module.exports=createAccesToken;