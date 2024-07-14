// pages/api/users/index.js
import dbConnect from '@/lib/mongo';
import User from '@/models/User';

export default async function handler(req: any, res: any) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error: any) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user });
      } catch (error: any) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> origin/main
