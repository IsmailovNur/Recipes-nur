import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import config from "./config";
import usersRouter from "./routers/users";
import recipesRouter from "./routers/recipes";
import commentsRouter from "./routers/comments";

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.static(config.publicPath));

app.use('/users', usersRouter);
app.use('/recipes', recipesRouter);
app.use('/comments', commentsRouter);

const run = async () => {
  await mongoose.connect(config.mongoDbUrl);

  app.listen(port, () => {
    console.log("Listening on port " + port);
  });
}

run().catch(e => console.error(e));

