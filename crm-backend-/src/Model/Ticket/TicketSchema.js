const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
  },
  subject: {
    type: String,
    maxLength: 200,
    required: true,
  },
  openAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  status: {
    type: String,
    required: true,
    default: "Open Status",
  },
  conversation: [
    {
      sender: {
        type: String,
        required: true,
        maxLength: 50,
      },
      message: {
        type: String,
        maxLength: 200,
        required: true,
      },
      messageAt: {
        type: Date,
        required: true,
        default: Date.now(),
      },
    },
  ],
});

module.exports = {
  TicketSchema: mongoose.model("Tickets", TicketSchema),
};
