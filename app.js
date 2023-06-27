dotenv.config();
import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";



import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";


import sectorRoute from "./route/sectorRoute.js";



const app = express();
//connect to database
// connectDb();

(async function () {
  await connectDb();
})();

// Body parser

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,x-auth,Accept,content-type,application/json"
  );
  next();
});

//rete limiting
const limit = rateLimit({
  max: 1000, // max requests
  windowMs: 60 * 60 * 1000, // 1 Hour of 'ban' / lockout 0
  message: "Too many requests", // message to send
});


//asyn-err0r-handler
app.use((err, req, res, next) => {
  if (err.message === "access denied") {
    res.status(403);
    res.json({ error: err.message });
  }

  next(err);
});
app.get("/", (req, res) => {
  res.send("<h1>Welcome to sector project </h1>");
});

//route middlewear

app.use("/api/sector", sectorRoute);


// Setup a default catch-all route

app.use("*", (req, res, next) => {
  res.status(404).json({
    error: "Invalid route!",
  });
  next();
});

if (process.env.NODE_ENV === "production") {
  dotenv.config();
}

//logging the request and respone time
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
if (process.env.NODE_ENV === "test") {
  module.exports = app;
}

export default app;
