import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, sparse: true }, // Optional for manual login
    profileImage: { type: String }, // Profile picture URL
    loginMethod: { type: String, enum: ['google', 'email'], required: true }, // Tracks login method
    settings: { notifications: { type: Boolean, default: true } },
    fcmToken: {type: String,required: false },
    following: [{ type: Schema.Types.ObjectId, ref: 'Organizer' }],
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const User= model('User', userSchema);

export default User;
