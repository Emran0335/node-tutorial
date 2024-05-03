// fake authentication system of session ID

/*

// index.mjs
import express, { request, response } from "express";
import routes from "./src/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUsersConstants } from "./src/sessions/sessions-constants.mjs";

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
  console.log(request.session);
  response.cookie("hello", "world", { maxAge: 30000, signed: true });
  response.status(201).send({ msg: "Hello" });
});

// fake authenticaton using session data and Id.
app.post("/api/auth", (request, response) => {
  const {
    body: { username, password },
  } = request;
  const findUser = mockUsersConstants.find(
    (user) => user.username === username
  );
  // 401 stands for unauthenticate
  if (!findUser || findUser.password !== password)
    return response.status(401).send({ msg: "BAD CREDENTIALS" });

  // dynamic property which is gonna be added to session object and it will modify the session object and its Id will never be changed.
  request.session.user = findUser;

  return response.status(200).send(findUser);
});

// authenticated status of the user which is done through using session object
app.get("/api/auth/status", (request, response) => {
  request.sessionStore.get(request.sessionID, (err, session) => {
    console.log(session);
  });
  return request.session.user
    ? response.status(200).send(request.session.user)
    : response.status(401).send({ msg: "Not Authenticated" });
});

app.post("/api/cart", (request, response) => {
  if (!request.session.user) return response.sendStatus(401);

  const { body: item } = request;

  const { cart } = request.session;
  if (cart) {
    cart.push(item);
  } else {
    request.session.cart = [item];
  }
  return response.status(201).send(item);
});

app.get("/api/cart", (request, response) => {
  if (!request.session.user) return response.sendStatus(401);

  return response.send(request.session.cart ?? []);
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});

*/

/*
 request.sessionStore.get(request.sessionID, (err, session) => {
    console.log(session);
  });

// the result of the console.log(session)
  {
  cookie: {
    originalMaxAge: 3600000,
    expires: '2024-05-02T04:08:38.066Z',
    httpOnly: true,
    path: '/'
  },
  user: {
    id: 1,
    username: 'anson',
    displayName: 'Anson',
    password: 'hello123'
  }
}
*/
