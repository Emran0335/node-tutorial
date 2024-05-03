import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsersConstants } from "../sessions/sessions-constants.mjs";

// to learn more, we have to search it in the stackoverflow
passport.serializeUser((user, done) => {
  console.log(`Inside Serialize User`);
  console.log(user);
  done(null, user.id); //the argument of done function ->user.id(unique)
});
passport.deserializeUser((id, done) => {
  console.log(`Indise Deserializer`);
  console.log(`Deserializing User Id: ${id}`);
  try {
    const findUser = mockUsersConstants.find((user) => user.id === id);
    if (!findUser) throw new Error("User not found!");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

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
