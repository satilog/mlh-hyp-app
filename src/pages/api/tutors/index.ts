import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongo';
import Tutor from '@/models/Tutor';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const tutor = await Tutor.create(req.body);
        res.status(201).json({ success: true, data: tutor });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case 'GET':
      try {
        const tutors = await Tutor.find({});
        res.status(200).json({ success: true, data: tutors });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
