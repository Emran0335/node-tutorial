/*
01. What is cookies? 
Ans: Cookies or HTTP Cookies, they are literally just small pieces of data that our web server sends to the browser. In our case, since we are using thunder client, we can pretend that this is our web browser. So whenever we make a request to URL, it will send me back a cookie. But currently our server is not sending any cookies. But we can see over here, whenever we make a request, we can go ahead and click on the response tab of thunder client and select cookies and see there are not any cookies sent back from the server. So the server sends a cookie to the user's web browser or the client(thunder client) and then the web browser or the client, in this case our thunder client can store the cookie. If you go into the browser and open up the devtools and the application tab. We can change that we can make our web server send the cookie back to the web browser and the web browser can store that cookie and then what happens next is that the web browser can actually send that cookie back to the server on any request we need to make. 

02. What is cookie important?
Ans: It is important because, by default our HTTP is stateless and what that it means is that whenever we make a request the server does not know from whom the request is coming and it does not know who the user is and knows nothing. So if we want to build an e-commerce website and we want to implement some kind cart system where we can add items to a cart and delete them from the cart and we want to make it functional where and when the user adds items to the cart and they close the website and go back on that website again that those items are still in the cart after they leave. So we need to use something like cookies becuse the server does not know who the use is and it does not know what items they added. But when we use cookies, we can send the cookies back to the server and the server will then know who the use is. And so, the next time, when the user come back can have all of their items on the cart displayed. So they do not have to readd everything all over again. Most of the time, in realistic large applications where we have authentication, we use cookies alongside with HTTP sessions. So, the main theme is that the server is stateless and using cookies enables the server to send a cookie to the web browser and that cookie typically is going to be some unique value so that the server when they receive it, they can distinguish whose cookie this belongs to and they can send dynamic data based on the cookies value.  
*/

/*
import express from "express";
import routes from "./src/index.mjs";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
// app.use(cookieParser());
app.use(cookieParser("helloworld"));
app.use(routes);

app.get("/", (request, response) => {
  // sending cookies
  // response.cookie("hello", "world", { maxAge: 30000});
  response.cookie("hello", "world", { maxAge: 30000, signed: true });
  response.status(201).send({ msg: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
*/

/*
import { Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
  // for learning cookies. Receiving cookis
  console.log(request.headers.cookie);
  console.log(request.cookies);
  // for sign cookies
  console.log(request.signedCookies.hello);
  // if (request.cookies.hello && request.cookies.hello === "world") {
  //   response.send([{ id: 123, name: "chicken breast", price: 12.99 }]);
  // }
  if (request.signedCookies.hello && request.signedCookies.hello === "world") {
    return response.send([{ id: 123, name: "chicken breast", price: 12.99 }]);
  }
  return response
    .status(403)
    .send({ msg: "Sorry. You need the correct cookie" });
});

export default router;
*/
