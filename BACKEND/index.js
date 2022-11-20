const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
// const session = require("express-session");
// const MongoDBStore = require("connect-mongodb-session")(session);
const User = require("./Model/User");
const { Server } = require("socket.io");
const socket = require("./socket.js");

const cors = require("cors");

dotenv.config();

// API
const productAPI = require("./API/Router/products");
const cartAPI = require("./API/Router/carts");
const orderAPI = require("./API/Router/order");
const messengerAPI = require("./API/Router/messenger");
const commentAPI = require("./API/Router/comment");
const authAPI = require("./API/Router/auth");
const adminRouter = require("./API/Router/admin");

const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGO;

// const store = new MongoDBStore({
//   uri: MONGODB_URI,
//   collection: "sessions",
// });

app.use(
  cors({
    withCredentials: true,
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// app.use(
//   session({
//     secret: "my secret",
//     resave: false,
//     saveUninitialized: false,
//     store: store,
//     cookie: {
//       // SameSite: "none",
//       secure: false,
//       maxAge: 1000 * 60 * 60 * 60,
//     },
//   })
// );

// app.use((req, res, next) => {
//   if (!req.headers.iduser || req.headers.iduser === "null") {
//     return next();
//   }
//   User.findById(req.headers.iduser)
//     .then((user) => {
//       if (!user) {
//         return next();
//       }
//       req.user = user;
//       next();
//     })
//     .catch((err) => {
//       next(new Error(err));
//     });
// });

// Tạo API
app.use("/api/auth", authAPI);
app.use("/api/products", productAPI);
app.use("/api/carts", cartAPI);
app.use("/api/histories", orderAPI);
app.use("/api/messenger", messengerAPI);
app.use("/api/comment", commentAPI);
app.use("/api/admin", adminRouter);

app.use((error, req, res, next) => {
  return res.status(error.httpStatusCode || 500).json(error.message);
});

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log("Connected to mongoDB.");
    const server = app.listen(process.env.PORT || 5000, () => {
      console.log(`Listening on port ${process.env.PORT || 5000}`);
    });
    const io = new Server(server);
    socket(io);
  })
  .catch((err) => {
    console.log(err);
  });
