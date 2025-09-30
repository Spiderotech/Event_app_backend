import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    orderId: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    contactInformation: {
        name: { type: String, required: true },
        email: { type: String, required: true },
    },
    tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket", required: true }], 
    isPaid: { type: Boolean, required: true },
    paymentMethod: { type: String, required: true },
    paymentId: { type: String }, // Payment ID for reference
    paidAmount: { type: Number, required: true },
    fee: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Order = model("Order", orderSchema);
export default Order;
