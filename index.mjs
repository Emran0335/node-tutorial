import express, { response } from "express";
import routes from "./src/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./src/passport/local-strategy.mjs";

const app = express();
const PORT = process.env.PORT || 5000;

// general middlewares
app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(
  session({
    secret: "anson the dev",
    saveUninitialized: false, // false is recommended!
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// main routes
app.use(routes);

// serialisedUser function will be called for the first time
app.post("/api/auth", passport.authenticate("local"), (request, response) => {
  response.status(201).send({ msg: "successful" });
});

// deserializedUser function will be called from saved session data from the request object
app.get("/api/auth/status", (request, response) => {
  console.log(`Inside api/auth/status`);
  console.log(request.user);

  return response.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
