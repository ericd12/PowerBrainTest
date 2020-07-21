const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");


require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client/build")));

mongoose.connect("mongodb://127.0.0.1:27017/powerbrain", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.set('useFindAndModify', false);

const { connection } = mongoose;
connection.once("open", () => {
  console.log("db connection created successfully");
});

const elementsRouter = require("./routes/api/elements");
const tracksRouter = require("./routes/api/tracks");
const programsRouter = require("./routes/api/programs");
const formatsRouter = require("./routes/api/formats");
const catsRouter = require("./routes/api/category");
const marketsRouter = require("./routes/api/markets");

app.use("/api/elements", elementsRouter);
app.use("/api/tracks", tracksRouter);
app.use("/api/programs", programsRouter);
app.use("/api/formats", formatsRouter);
app.use("/api/categories", catsRouter);
app.use("/api/markets", marketsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
