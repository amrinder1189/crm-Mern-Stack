const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

//mongoose connection
mongoose.connect(process.env.MONGO).then(() => {
  console.log("Mongoose Connected Successfully");
});

//app security
// app.use(helmet())

// cors enablement
app.use(cors());

// using morgan
// app.use(morgan())

//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//user
const userRouter = require("./src/Routes/User.Route");
app.use("/v1/user", userRouter);

//Tickets
const TicketRouuter = require("./src/Routes/Ticket.Route");
app.use("/v1/ticket", TicketRouuter);

// normal
app.use("/", (req, res) => {
  res.json({ messgae: "Amrinder Singh" });
});

app.listen(3001);
