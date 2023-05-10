const { TicketSchema } = require("../Ticket/TicketSchema");

const insertTicket = (obj) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema(obj)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      console.log("error from the ticket insertion", error);
      reject(error);
    }
  });
};

const getallTickets = (clientId) => {
  return new Promise((resolve, reject) => {
    try {
      const data = TicketSchema.find({ clientId });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

const getTicketById = (_id) => {
  return new Promise((resolve, reject) => {
    const Data = TicketSchema.find({ _id });
    resolve(Data);
  });
};

const updatemessage = ({ ticketId, sender, message }) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("hello");
      console.log(ticketId, sender, message);
      TicketSchema.findOneAndUpdate(
        { _id: ticketId },
        {
          status: "Pending operator response",
          $push: {
            conversation: { message, sender },
          },
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => console.log(error));
    } catch (error) {
      reject(error);
    }
  });
};

const closeTicketStat = (ticket) => {
  TicketSchema.findOneAndUpdate(
    { _id: ticket },
    { status: "Closed" },
    { new: true }
  )
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteTicketStat = (_id) => {
  try {
    TicketSchema.findByIdAndDelete(_id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  insertTicket,
  getallTickets,
  getTicketById,
  updatemessage,
  closeTicketStat,
  deleteTicketStat,
};
