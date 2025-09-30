import { Schema, model, Types } from "mongoose";

const ticketSchema = new Schema({
    _id: { type: Types.ObjectId, default: () => new Types.ObjectId() }, // Unique ID for each ticket
    type: { type: String, enum: ['free', 'paid'], required: true },

    // Common fields for both Free and Paid tickets
    name: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    salesStartDate: { type: Date, required: true },
    salesEndDate: { type: Date, default:null},
    sold: { type: Number, default: 0 },

    // Paid ticket-specific fields
    price: {
        type: Number,
        required: function () {
            return this.type === 'paid';
        },
    },
    feesType: {
        type: String,
        required: function () {
            return this.type === 'paid';
        },
    },
});

const eventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },

    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    locationType: { type: String, enum: ['online', 'offline'], required: true },

    location: {
        type: { type: String, enum: ['online', 'offline'], required: true },
        name: { type: String, required: true },
        coordinates: {
            lat: { type: Number, default: null },
            lng: { type: Number, default: null },
        }, 
    },

    eventType: { type: String, required: true },
    eventCategory: { type: String, required: true },

    refundPolicy: { type: String, required: true },
    privacy: { type: String, enum: ['Public Event', 'Private Event'], required: true },

    image: { type: String },

    status: {
        type: String,
        enum: ['draft', 'live'],
        default: 'draft',
        required: true,
    },
    meetLink: { type: String, default: null },

    tickets: [ticketSchema],  // Use the updated ticket schema

    createdBy: { type: Types.ObjectId, ref: 'Organizer', required: true },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Event = model('Event', eventSchema);

export default Event;
