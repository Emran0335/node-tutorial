/*
01. What is passport js and why do we need to it in express js application?
Ans: For local strategy of authentication of a user, we can use passport js which means, instead of using a thirdparty provider like google, facebook, twitter, we can use credentials that are saved on the actual application database.

02. What is serialize and deserialize in passport js?
Ans: Passport needs to serialize the user into the session object of express session. We need to implement two functions. Otherwise we will get error in the console. In the strategy file, we need to call passport serializeUser function and this function takes in two arguments in its callback function. The first argument is actual user that we are trying to serialize. The function is responsibe to take the user object that we just have validated and then storing it in the session. That is why passport integrates very well with express session. So it takes the that user we just found from this verify function and it will take care of storing it in the session data. The second argument is done function. Inside this callback function we do not need to do anything, we need to just call the done function. Done function takes two arguments. We need to pass null for the err and the second argument can be passed but needs to be unique(user.id) for searching for the user in our array or in the database. 

We also call the passport deserializeUser function and it also takes callback function as argument. The callback function takes two arguments. It takes in whatever it was that we passed in to the done functon of the serializeUser function. We pass the id of the user(user.id).

*/
/*
import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsersConstants } from "../sessions/sessions-constants.mjs";

export default passport.use(
  new Strategy((username, password, done) => {
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    try {
      const findUser = mockUsersConstants.find(
        (user) => user.username === username
      );
      if (!findUser) throw new Error("User not found");
      if (findUser.password !== password)
        throw new Error("Invalid Credentials");
      done(null, findUser);
    } catch (err) {
      // all errors occured above will be caught in this error block
      done(err, null);
    }
  })
);

*/

/*
// local-strategy.mjs
import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsersConstants } from "../sessions/sessions-constants.mjs";

// if we use email instead of username, we need to use optional argument of {usernameField: "email"}
export default passport.use(
  new Strategy({usernameField: "email"}, (username, password, done) => {
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    try {
      const findUser = mockUsersConstants.find(
        (user) => user.username === username
      );
      if (!findUser) throw new Error("User not found");
      if (findUser.password !== password)
        throw new Error("Invalid Credentials");
      done(null, findUser);
    } catch (err) {
      // all errors occured above will be caught in this error block
      done(err, null);
    }
  })
);
*/

/*
// index.mjs
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

app.post(
  "/api/auth",
  passport.authenticate("local"),
  (request, response) => {
    
  }
);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
*/
