const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const reviewRouter = require('./routes/reviews.routes');

dotenv.config();

const PORT = process.env.PORT || 8080;

start();

function start() {
  const app = initServer();
  connectMiddlewares(app);
  declareRoutes(app);
  connectToDb();
  listen(app);
}

function initServer() {
  return express();
}

function connectMiddlewares(app) {
  app.use(express.json());
  app.use(
    cors({
      origin: '*',
    }),
  );
}

function declareRoutes(app) {
  app.use('/reviews', reviewRouter);
}

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      userNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log('Database connection successful');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}
function listen(app) {
  app.listen(PORT, () => {
    console.log('Server is listening on port', PORT);
  });
}
