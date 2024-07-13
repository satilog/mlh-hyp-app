// pages/api/hello.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/mongo';
import mongoose from 'mongoose';

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
  await dbConnect();

  const newMessage = new Hello({ name: 'Hello, world!' });
  await newMessage.save();

  res.status(200).json({ message: 'Hello, world!' });
}
