// pages/api/hello.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/mongo';
import mongoose from 'mongoose';
import User from '@/models/User';

type Data = {
  message: string;
}

const helloSchema = new mongoose.Schema({
  name: String,
});

const Hello = mongoose.models.Hello || mongoose.model('Hello', helloSchema);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect().then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
//   get user profile data
    const allUsers = await User.find({});
    console.log(allUsers);
    // now return the data
    res.status(200).json({ message: 'Hello, world!', allUsers });
}
