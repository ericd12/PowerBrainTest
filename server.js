const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.json());
app.use(express.static(path.join(__dirname, "client/build")));

app.get('/', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

mongoose.connect("mongodb://127.0.0.1:27017/powerbrain", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const { connection } = mongoose;
connection.once("open", () => {
  console.log("db connection created successfully");
});

const elementsRouter = require("./routes/elements");
const tracksRouter = require("./routes/tracks");
const programsRouter = require("./routes/programs");
const formatsRouter = require("./routes/formats");
const catsRouter = require("./routes/category");
const marketsRouter = require("./routes/markets");

app.use("/api/elements", elementsRouter);
app.use("/api/tracks", tracksRouter);
app.use("/api/programs", programsRouter);
app.use("/api/formats", formatsRouter);
app.use("/api/categories", catsRouter);
app.use("/api/markets", marketsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
