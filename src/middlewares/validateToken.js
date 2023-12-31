const jwt = require("jsonwebtoken");
const tokenSecret = process.env.TOKEN_SECRET;

exports.authRequired = (req, res, next) => {
  const {token} = req.cookies;
   
  if (!token)
    return res
      .status(401)
      .json({ message: "No hay token , ingreso no autorizado" });

  jwt.verify(token, tokenSecret, (err, user) => {
 

    if (err) res.status(403).json({ message: "token invalido" });
 
    req.user=user
    next();
  });
};
