const jwt = require("jsonwebtoken");
const  TOKEN_SECRET  = require("../libs/jwt");

exports.authRequired = (req, res, next) => {
  const cookies = req.cookies;

  if (!token)
    return res
      .status(401)
      .json({ message: "No hay token , ingreso no autorizado" });

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "token invalido" });

    console.log(user);
    next();
  });
};
