const express = require("express");
var jwt = require("jsonwebtoken");

const router = express.Router();
const {
  insertTicket,
  getallTickets,
  getTicketById,
  updatemessage,
  closeTicketStat,
  deleteTicketStat,
} = require("../Model/Ticket/Ticket");
const { verifyjwt } = require("../utilies/jwt.helper");
router.all("/", (req, res, next) => {
  // res.json({message: 'amrinder from ticket side'})
  next();
});

/*****************************
 * FOR CREATING A NEW TICKET *
 *****************************/

router.post("/", async (req, res) => {
  const { subject, sender, message } = req.body;
  //getting the userid from jwt
  const { authorization } = req.headers;
  var decoded = jwt.verify(authorization, process.env.JWT_ACCESS_SECRET);

  // const user = await verifyjwt();
  const user_id = decoded.payload._id;

  //save a new ticket
  const obj = {
    clientId: user_id,
    subject,
    conversation: [
      {
        sender,
        message,
      },
    ],
  };

  const Ticketsaved = await insertTicket(obj);
  if (Ticketsaved) {
    console.log("saved");
  } else {
    console.log("not ssaced");
  }
});

/*********************************************************
 * FOR GETTING ALL THE TICKETS ASSOCIATED WITH THIS USER *
 *********************************************************/

router.get("/", async (req, res) => {
  const { authorization } = req.headers;
  var decoded = jwt.verify(authorization, process.env.JWT_ACCESS_SECRET);
  const user_id = decoded.payload._id;

  //get all tickets for this user
  const Tickets = await getallTickets(user_id);
  res.json({ data: Tickets });
});

/************************************************
 * // FOR GETTING THE TICKET WITH TICKET NUMBER *
 ************************************************/

router.get("/:ticketId", async (req, res) => {
  const { ticketId } = req.params;
  console.log(ticketId);
  //findinf the ticker
  const Ticket = await getTicketById(ticketId);
  res.json({ Ticket: Ticket });
});

/***************************************************
 * FOR ADDING THE NEW MESSAGE IN THE TICKET SCHEMA *
 ***************************************************/

router.put("/:ticketId", async (req, res) => {
  //get the ticket id
  const { ticketId } = req.params;
  console.log(ticketId);
  //get the client name from haeaders
  const { authorization } = req.headers;
  var decoded = jwt.verify(authorization, process.env.JWT_ACCESS_SECRET);

  const { sender, message } = req.body;

  //update message
  const updatedmsg = await updatemessage({
    ticketId,
    sender,
    message,
  });
  res.json({ getting: updatedmsg });
});

/****************************************
 * // FOR TICKETING TO CLOSE THE TICKET *
 ****************************************/

router.patch("/close-ticket/:ticketId", async (req, res) => {
  const { ticketId } = req.params;
  console.log(ticketId)
  const close = await closeTicketStat(ticketId);
  console.log(close,"closed")
  res.json({ message: close });
});

/**************************
 * FOR Deleting THE TICKET *
 **************************/

router.delete("/:ticketId", async (req, res) => {
  const { ticketId } = req.params;

  const close = await deleteTicketStat(ticketId);
  res.json({ message: close });
});

module.exports = router;
