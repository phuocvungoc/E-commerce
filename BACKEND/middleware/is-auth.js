exports.isAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(500).json("Not logged in yet");
  }
  next();
};

exports.isCounselors = (req, res, next) => {
  if (req.session.role === "counselors" || req.session.role === "admin") {
    next();
  } else return res.status(500).json("Unauthorized");
};

exports.isAdmin = (req, res, next) => {
  if (req.session.role !== "admin") {
    return res.status(500).json("Unauthorized");
  }
  next();
};
