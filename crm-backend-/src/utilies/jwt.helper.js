var jwt = require("jsonwebtoken");

const createjwt = (payload) => {
  const accessjwt = jwt.sign({payload} , process.env.JWT_ACCESS_SECRET);

  return accessjwt;
};

const verifyjwt = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      const { authorization } = req.headers;
      var decoded = jwt.verify(authorization, process.env.JWT_ACCESS_SECRET);
      resolve(decoded);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { createjwt, verifyjwt };
