/*
01. What is sessions?
Ans: Sessions represent the duration of a user on a website. By default, HTTP is stateless. We do not know who is making requests to our server. So, we need to be able to track requests and know where they are coming from. One common usage of sessions is to manage user authentication. Sessions are created on the server by generating an object with a session ID. When an HTTP request is sent to the server from the web browser, the response can return with instructions to set a cookie with the session ID so that it can be saved in the browser. This allows the browser to send the cookie on subsequent requests to the server. The server can then parse the cookie from text to json and then verify the session ID sent from the client and determine who the request was sent from. Whenever the browser sends the cookies on each request, the server can look up which user pertains to the session as the server maintains a mapping of each session ID to the user. We have to use express-sessions library.

If we modify the session data object, it will never create new session ID. Otherwise it will be very difficult to track the user if it regenerates session ID in each time we make the request to the server. So this is why we need to modify the session data object. When we modify the session data object, Express session will create a cookie or it will set the cookie and then that cookie will be sent back to the web browser or the client side(Thunder client). The client side or the web browser of the user will store that cookie and then on subsequent requests or future requests that cookie will be sent to the server assuming it has not been expired. The server of course will go through the express session middleware beacause Express session is a middleware. So it will go through this whole session middleware and then it will validate that cookie. So if the cookie is not expired or if it is not invalid, then express session will not generate a new session or session Id at all. 
*/

/*
01. session is set here

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

*/


/*
02. session Id can be achieved here
import { Router } from "express";
import {
  query,
  validationResult,
  checkSchema,
  matchedData,
} from "express-validator";
import { createUserValidationSchemaForBody } from "../utils/validationSchemas.mjs";
import { mockUsers } from "../utils/constants.mjs";
import { resolveIndexByUserId } from "../utils/middlewares.mjs";

const router = Router();

// router is called a mini application

router.get(
  "/api/users",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("Filter must not be empty")
    .isLength({ min: 3, max: 10 })
    .withMessage("must be at least 3-10 characters"),
  (request, response) => {
    console.log(request.session);
    console.log(request.session.id);
    request.sessionStore.get(request.session.id, (err, sessionData) => {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log(sessionData);
    });
    // console.log(request["express-validator#contexts"]);
    const result = validationResult(request);
    console.log(result);
    const {
      query: { filter, value },
    } = request;
    if (filter && value)
      return response.send(
        mockUsers.filter((user) => user[filter].includes(value))
      );
    return response.send(mockUsers);
  }
);

router.get("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;
  const findUser = mockUsers[findUserIndex];
  if (!findUser) return response.sendStatus(404);
  return response.send(findUser);
});

router.post(
  "/api/users",
  checkSchema(createUserValidationSchemaForBody),
  (request, response) => {
    const result = validationResult(request);
    // console.log(result);
    if (!result.isEmpty()) {
      return response.status(400).send({ errors: result.array() });
    }
    const data = matchedData(request);
    // console.log(data)
    // const { body } = request;
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };
    mockUsers.push(newUser);
    return response.status(201).send(newUser);
  }
);
router.put("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return response.sendStatus(200);
});

router.patch("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return response.sendStatus(200);
});

router.delete("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;
  mockUsers.splice(findUserIndex, 1);
  return response.sendStatus(200);
});

export default router;

*/