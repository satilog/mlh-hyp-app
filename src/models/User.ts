import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the document
interface IExperience {
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate: Date;
  description: string;
}

interface IEducation {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate: Date;
}

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  headline: string;
  location: string;
  industry: string;
  summary: string;
  experience: IExperience[];
  education: IEducation[];
  skills: string[];
}

// Define the schema
const ExperienceSchema: Schema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String, required: true }
});

const EducationSchema: Schema = new Schema({
  school: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  headline: { type: String, required: true },
  location: { type: String, required: true },
  industry: { type: String, required: true },
  summary: { type: String, required: true },
  experience: { type: [ExperienceSchema], required: true },
  education: { type: [EducationSchema], required: true },
  skills: { type: [String], required: true }
});

// Create and export the model
const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
export default User;
