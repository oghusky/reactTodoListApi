require("dotenv").config();
const express = require("express");
const db = require("./utils/config");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
// connects to db
mongoose.connect(db.connection, { useNewUrlParser: true }).then(response => {
    console.log("Connected to DB");
});
// use cors
app.use(cors());
// return text as json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// require todo routes
const todoRoutes = require("./routes/todoRoutes");
// use todo Routes
app.use("/api", todoRoutes);
// port to listen on
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server Started`);
});