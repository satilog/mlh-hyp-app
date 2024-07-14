import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true }
});

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  duration: { type: String, required: true }
});

const certificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuing_organization: { type: String, required: true },
  issue_date: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  headline: { type: String, required: true },
  location: { type: String, required: true },
  summary: { type: String, required: true },
  experience: { type: [experienceSchema], required: true },
  education: { type: [educationSchema], required: true },
  skills: { type: [String], required: true },
  certifications: { type: [certificationSchema], required: true }
});

export default mongoose.models.User || mongoose.model('User', userSchema);