import express from "express";
import routes from "./src/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";

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

// main routes
app.use(routes);

app.get("/", (request, response) => {
  // sending cookies
  console.log(request.session);
  console.log(request.session.id);
  request.session.visited = true; // custom property set to session object
  console.log(request.session)
  response.cookie("hello", "world", { maxAge: 30000, signed: true });
  response.status(201).send({ msg: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
