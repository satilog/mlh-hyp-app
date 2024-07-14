import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongo';
import Tutor from '@/models/Tutor';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const tutor = await Tutor.findById(id);
        if (!tutor) {
          return res.status(404).json({ success: false, message: 'Tutor not found' });
        }
        res.status(200).json({ success: true, data: tutor });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case 'PUT':
      try {
        const tutor = await Tutor.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!tutor) {
          return res.status(404).json({ success: false, message: 'Tutor not found' });
        }
        res.status(200).json({ success: true, data: tutor });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case 'DELETE':
      try {
        const deletedTutor = await Tutor.deleteOne({ _id: id });
        if (!deletedTutor) {
          return res.status(404).json({ success: false, message: 'Tutor not found' });
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
