import mongoose, { Document, Model, Schema } from 'mongoose';

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

interface IEvent extends Document {
  title: string;
  host: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  price: string;
  imageUrl: string;
  description: string;
  category: string;
  tags: string[];
  contactEmail: string;
  website: string;
  capacity: number;
  registrationLink: string;
}

const experienceSchema = new Schema<IExperience>({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String, required: true },
});

const educationSchema = new Schema<IEducation>({
  school: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const eventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  host: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  attendees: { type: Number, required: true },
  price: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  contactEmail: { type: String, required: true },
  website: { type: String, required: true },
  capacity: { type: Number, required: true },
  registrationLink: { type: String, required: true },
});

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);

export default Event;
