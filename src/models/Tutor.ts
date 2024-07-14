import mongoose, { Document, Model, Schema } from 'mongoose';

// Define interfaces for the subdocuments
interface Education {
  degree: string;
  fieldOfStudy: string;
  school: string;
  yearOfCompletion: number;
}

interface Certification {
  name: string;
  organization: string;
  yearOfCompletion: number;
}

interface Review {
  reviewerName: string;
  rating: number;
  comment: string;
}

interface SocialMediaLinks {
  linkedin?: string;
  twitter?: string;
}

// Define the main Tutor interface extending Document
interface ITutor extends Document {
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl: string;
  bio: string;
  subjects: string[];
  experienceYears: number;
  education: Education[];
  certifications: Certification[];
  availability: string[];
  hourlyRate: number;
  rating: number;
  reviews: Review[];
  languages: string[];
  location: string;
  contactNumber: string;
  website?: string;
  socialMediaLinks?: SocialMediaLinks;
}

// Define the subdocument schemas
const EducationSchema = new Schema<Education>({
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  school: { type: String, required: true },
  yearOfCompletion: { type: Number, required: true },
});

const CertificationSchema = new Schema<Certification>({
  name: { type: String, required: true },
  organization: { type: String, required: true },
  yearOfCompletion: { type: Number, required: true },
});

const ReviewSchema = new Schema<Review>({
  reviewerName: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

const SocialMediaLinksSchema = new Schema<SocialMediaLinks>({
  linkedin: { type: String },
  twitter: { type: String },
});

// Define the main Tutor schema
const TutorSchema = new Schema<ITutor>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePictureUrl: { type: String, required: true },
  bio: { type: String, required: true },
  subjects: { type: [String], required: true },
  experienceYears: { type: Number, required: true },
  education: { type: [EducationSchema], required: true },
  certifications: { type: [CertificationSchema], required: true },
  availability: { type: [String], required: true },
  hourlyRate: { type: Number, required: true },
  rating: { type: Number, required: true },
  reviews: { type: [ReviewSchema], required: true },
  languages: { type: [String], required: true },
  location: { type: String, required: true },
  contactNumber: { type: String, required: true },
  website: { type: String },
  socialMediaLinks: { type: SocialMediaLinksSchema },
});

// Create and export the Tutor model
const Tutor: Model<ITutor> = mongoose.models.Tutor || mongoose.model<ITutor>('Tutor', TutorSchema);

export default Tutor;
