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
    const email = req.headers['email'];
    console.log(email);
    const singleUser = await User.findOne({ email: email });
    console.log(singleUser);
    res.status(200).json({ message: 'Hello, world!', singleUser });
}
