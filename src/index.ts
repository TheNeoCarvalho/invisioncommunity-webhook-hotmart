import cors from "cors";
import "dotenv/config";
import express, { Express, Request, Response } from "express";
import helmet from "helmet";

import * as middleware from "./middleware";

import articlesRouter from "./routers/articles.router";

const PORT = process.env.PORT || 8080;
const ENV = process.env.NODE_ENV || "production";

const app: Express = express();

app.use(helmet());

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(middleware.httpLogger);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome");
});

// Articles routes

app.use("/webhook", articlesRouter);

// Error hanlding middleware

app.use(middleware.errorHandler);

app.use(middleware.notFoundHandler);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${ENV} environment`);
});

export { app as default, server };
