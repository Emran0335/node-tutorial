import express, { response } from "express";
import {
  validationResult,
  matchedData,
  checkSchema,
} from "express-validator";
import { createUserValidationSchemaForBody } from "./src/utils/validationSchemas.mjs";
import usersRouter from "./src/routes/users.mjs";
import { mockUsers } from "./src/utils/constants.mjs";
import {resolveIndexByUserId, loggingMiddleware} from "./src/utils/middlewares.mjs"

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(usersRouter);


app.use(express.json());
// globally used middleware. Middlewares must be registered before the route if we use app.use().
// app.use(loggingMiddleware);

// middleware passed as argument
app.get("/", loggingMiddleware, (request, response) => {
  response.status(201).send({ msg: "Hello" });
});

// middleware can be used in the argument as many as we wish and they are called sequential order
app.get(
  "/api/argument",
  (request, response, next) => {
    console.log("base url - 1");
    next();
  },
  (request, response, next) => {
    console.log("base url - 2");
    next();
  },
  (request, response, next) => {
    console.log("base url - 3");
    next();
  },
  (request, response, next) => {
    response.status(201).send({
      msg: "It will not be called if next function of the middleware argument is not called first in the middleware",
    });
    // no need to call next() in this regard
    next();
  }
);



app.get("/api/products", (request, response) => {
  response.send([{ id: 123, name: "chicken breast", price: 12.99 }]);
});


app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
