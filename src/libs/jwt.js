require("dotenv").config();
const jwt = require("jsonwebtoken");
const tokenSecret = process.env.TOKEN_SECRET;

const createAccesToken = (payload) => {
  return new Promise((resolve, reject) => {
    //resolve es cuando esta todo bien y el reject cuando hubo problemas

    try {
      jwt.sign(payload, tokenSecret, { expiresIn: "1d" }, (err, token) => {
        if (err) {
          reject({ message: err.message });
        } else {
          resolve(token);
        }
      });
    } catch (error) {
      reject(error.message);
    }
  });
};

module.exports = createAccesToken;
