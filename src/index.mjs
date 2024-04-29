import { Router } from "express";
import usersRouter from "./routes/users.mjs"
import productsRouter from "./routes/products.mjs"

const router = Router();

router.use(usersRouter);
router.use(productsRouter);


export default router;
