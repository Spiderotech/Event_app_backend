import { Schema, model } from "mongoose";

const organizerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, sparse: true }, // Optional for manual login
    profileImage: { type: String }, // Profile picture URL
    about: { type: String, default: '' }, // Optional field for "about" section
    loginMethod: { type: String, enum: ['google', 'email'], required: true }, // Tracks login method
    fcmToken: {type: String,required: false },
    otp: { type: String },  // ✅ OTP for verification
    otpExpiration: { type: Date },  // ✅ Expiration time for OTP
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Organizer = model('Organizer', organizerSchema);

export default Organizer;
