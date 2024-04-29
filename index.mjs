import express from "express";
import routes from "./src/index.mjs";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(routes);

app.get("/", (request, response) => {
  // sending cookies
  response.cookie("hello", "world", { maxAge: 30000, signed: true });
  response.status(201).send({ msg: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
