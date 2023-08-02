import express from "express";

import * as articlesController from "../controllers/articles.controller";

const router = express.Router();

router.post("/", articlesController.createUser);

export { router as default };
