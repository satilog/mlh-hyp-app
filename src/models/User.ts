// models/User.ts
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  linkedinId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePicture: { type: String },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
