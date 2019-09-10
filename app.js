require("dotenv").config();
const express = require("express");
const db = require("./utils/config");
const mongoose = require("mongoose");
const log = console.log;
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
// connects to db
mongoose.connect(db.connection, { useNewUrlParser: true }).then(response => {
    log("Connected to DB");
});
// use cors
app.use(cors());
// points to static folder
app.use(express.static(path.join(__dirname, "public")));
// return text as json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// require todo routes
const todoRoutes = require("./routes/todoRoutes");
// use todo Routes
app.use("/", todoRoutes);
// port to listen on
app.listen(PORT, () => {
    log(`Server Started on port ${PORT}`);
});