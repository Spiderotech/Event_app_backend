import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
  ticketId: { type: String, required: true, unique: true }, // Unique ticket ID for the ticket instance
  orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true }, // Associated order
  eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true }, // Associated event
  eventTicketId: { type: String }, // Unique ticket type ID within the event (e.g., General Admission, VIP)
  name: { type: String, required: true }, // Name of the ticket holder
  email: { type: String, required: true }, // Email of the ticket holder
  price: { type: Number, default: 0 }, // Price of the ticket
  isUsed: { type: Boolean, default: false }, // Status for check-in or verification
  createdAt: { type: Date, default: Date.now }, // Creation date
});

const Ticket = model("Ticket", ticketSchema);
export default Ticket;
