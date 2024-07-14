import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongo';
import Event from '@/models/Event';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const event = await Event.findById(id);
        if (!event) {
          return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.status(200).json({ success: true, data: event });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case 'PUT':
      try {
        const event = await Event.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!event) {
          return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.status(200).json({ success: true, data: event });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case 'DELETE':
      try {
        const deletedEvent = await Event.deleteOne({ _id: id });
        if (!deletedEvent) {
          return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
