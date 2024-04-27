import express, { response } from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const loggingMiddleware = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);

  next();
};

app.use(express.json());
// globally used middleware. Middlewares must be registered before the route if we use app.use().
// app.use(loggingMiddleware);

const mockUsers = [
  { id: 1, username: "anson", displayName: "Anson" },
  { id: 2, username: "jack", displayName: "Jack" },
  { id: 3, username: "adam", displayName: "Adam" },
  { id: 4, username: "tina", displayName: "Tina" },
  { id: 5, username: "jason", displayName: "Jason" },
  { id: 6, username: "henry", displayName: "Henry" },
  { id: 7, username: "marilyn", displayName: "Marilyn" },
];

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

app.get("/api/users", (request, response) => {
  console.log(request.query);

  const {
    query: { filter, value },
  } = request;

  if (filter && value)
    return response.send(
      mockUsers.filter((user) => user[filter].includes(value))
    );
  return response.send(mockUsers);
});

app.get("api/users/:id", (request, response) => {
  console.log(request.params);

  const parsedId = parseInt(request.params.id);
  if (isNaN(parsedId)) {
    return response.status(400).send({ msg: "Bad Request and Invalid ID." });
  }
  const findUser = mockUsers.find((user) => user.id === parsedId);

  if (!findUser) return response.sendStatus(404);
  return response.send(findUser);
});

app.post("/api/users", (request, response) => {
  const { body } = request;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };

  mockUsers.push(newUser);
  return response.status(201).send(newUser);
});

app.get("/api/products", (request, response) => {
  response.send([{ id: 123, name: "chicken breast", price: 12.99 }]);
});

app.put("/api/users/:id", (request, response) => {
  const {
    body,
    params: { id },
  } = request;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

  if (findUserIndex === -1) return response.sendStatus(404);
  mockUsers[findUserIndex] = { id: parsedId, ...body };

  return response.sendStatus(200);
});

app.patch("/api/users/:id", (request, response) => {
  const {
    body,
    params: { id },
  } = request;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

  if (findUserIndex === -1) return response.sendStatus(404);
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };

  return response.sendStatus(200);
});

app.delete("/api/users/:id", (request, response) => {
  const {
    params: { id },
  } = request;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return response.sendStatus(404);
  mockUsers.splice(findUserIndex, 1);

  return response.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Running oin Port ${PORT}`);
});
