// /pages/api/check-username.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { users } from './mockUser';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userNameId } = req.body;

    // Check if userNameId already exists
    const exists = users.some(
      (user) => user.userNameId.toLowerCase() === userNameId.toLowerCase()
    );

    if (exists) {
      return res.status(400).json({ message: 'ID is already taken.' });
    }

    return res.status(200).json({ message: 'ID is available.' });
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
