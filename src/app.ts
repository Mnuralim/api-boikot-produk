import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./controllers/errorHandler";
import ApiError from "./utils/apiError";
import ProductRouter from "./routes/products";

const app: Express = express();

app.use(express.json());
app.use(morgan("dev"));
// @ts-ignore
app.use(cors());

app.use(cookieParser());

app.use("/api/products", ProductRouter);

app.all("*", (req, res, next) => {
  next(new ApiError(`Routes does not exist`, 404));
});
app.use(errorHandler);

export default app;
