const jwt = require("jsonwebtoken");
const User = require("../Model/User");
const { getError40x } = require("./error403.js");

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(getError40x(401, "You are not authenticated!"));
    }

    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) throw new Error("Token is not valid!");

      User.findById(user._id)
        .then((result) => {
          req.user = result;
          return req.user;
        })
        .then((result) => {
          next();
        });
    });
  } catch (error) {
    return next(getError40x(403, error.message));
  }
};

exports.verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role) {
      next();
    } else {
      return next(getError40x(403, "You are not authorized!"));
    }
  });
};

exports.verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return next(getError40x(403, "You are not authorized!"));
    }
  });
};

exports.verifyCounselors = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin" || req.user.role === "counselors") {
      next();
    } else {
      return next(getError40x(403, "You are not authorized!"));
    }
  });
};
