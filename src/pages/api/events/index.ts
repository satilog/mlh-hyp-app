// pages/api/events/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongo';
import EventModel from '@/models/Event';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const events = await EventModel.find({});
        res.status(200).json({ success: true, data: events });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false, message: 'Method not allowed' });
      break;
  }
}
