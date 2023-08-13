exports.authRequired = (req, res, next) => {
const cookies=req.headers.cookies;
console.log(cookies);
  next();
};