const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { getErr500 } = require("./error");
const User = require("../../Model/User");

exports.postSignup = (req, res, next) => {
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array()[0].msg);
  }

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        fullname: fullname,
        email: email,
        password: hashedPassword,
        phone: phone,
        cart: { items: [] },
      });
      return user.save();
    })
    .then((result) => {
      return res.status(200).json("Sign up successfully");
    })
    .catch((err) => {
      return next(getErr500(err));
    });
};

// exports.postLogin = (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(422).json(errors.array()[0].msg);
//   }

//   User.findOne({ email: email })
//     .then((user) => {
//       if (!user) {
//         return res.status(500).json("Invalid email or password");
//       }
//       bcrypt
//         .compare(password, user.password)
//         .then((doMatch) => {
//           if (doMatch) {
//             req.session.user = user;
//             req.session.role = user.role;
//             return req.session.save((err) => {
//               res.cookie("fullname", user.fullname).status(200).send(user);
//             });
//           } else {
//             return res.status(500).json("Invalid email or password");
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     })
//     .catch((err) => {
//       return next(getErr500(err));
//     });
// };

// exports.postLoginAdmin = (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(422).json(errors.array()[0].msg);
//   }

//   User.findOne({ email: email })
//     .then((user) => {
//       if (!user) {
//         return res.status(500).json("Invalid email or password");
//       }

//       if (user.role !== "admin" && user.role !== "counselors") {
//         return res.status(500).json("Not have access!");
//       }

//       bcrypt
//         .compare(password, user.password)
//         .then((doMatch) => {
//           if (doMatch) {
//             req.session.user = user;
//             req.session.role = user.role;
//             return req.session.save((err) => {
//               res
//                 .cookie("fullname", user.fullname, {
//                   sameSite: "none",
//                   secure: true,
//                 })
//                 .status(200)
//                 .send(user);
//             });
//           } else {
//             return res.status(500).json("Invalid email or password");
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     })
//     .catch((err) => {
//       return next(getErr500(err));
//     });
// };

// exports.postLogout = (req, res, next) => {
//   req.session.destroy((err) => {
//     res.cookie("fullname", false).status(200).send("ok");
//   });
// };

exports.postLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("User not found!");

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) throw new Error("Wrong password or username!");

    const { password, ...otherDetails } = user._doc;

    const accessToken = jwt.sign(
      {
        ...otherDetails,
      },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.status(200).send({ ...otherDetails, accessToken });
  } catch (err) {
    return next(getErr500(err));
  }
};
