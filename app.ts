import express from "express";
import path from "path";
import morgan from "morgan"; //logging
import AuthRouter from "./routes/AuthRoutes.js";
import bodyParser from "body-parser";
// import { dbInit} from "./database/index.js";
// import { cors } from "./middleware/cors.js";
import session from "express-session";
import cors from "cors";
import UserRouter from "./routes/UserRoutes.js";
import { env } from "./config/index.config.js";

const API_PREFIX: string = env.API_PREFIX;
const session_secret: string = env.SESSION_SECRET;
const static_path: string = path.join(import.meta.dirname, "public");

let isSecure = false;

if (process.env.APP_ENV === "production") {
  isSecure = true;
}

const app = express();
app.use(cors());

app.use(
  session({
    secret: session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isSecure,
      maxAge: 60000,
    },
  })
);
// console.log({ isSecure: isSecure });

app.use(morgan("dev"));

app.use(express.static(static_path));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(API_PREFIX, AuthRouter);
app.use(API_PREFIX, UserRouter);

// app.get("/", (request, response) => {
//       // localhost:8000/
//       console.log("Welcome to the application");
//       response.json({ status: true, message: "Welcome to the application" });
// })

app.get("/", (request, response) => {
  // localhost:8000/home
  // response.json({ status: true, message: "Welcome Home" });

  const filepath = path.join(import.meta.dirname, "public/pages/index.html");

  response.sendFile(filepath);
});

export default app;
