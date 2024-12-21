// /pages/api/signup.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { users, User } from './mockUser';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const newUser: User = req.body;

    // Check if email already exists
    const emailExists = users.some(user => user.email.toLowerCase() === newUser.email.toLowerCase());
    if (emailExists) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    // Add user to in-memory array
    users.push(newUser);

    return res.status(201).json({ message: 'User registered successfully.' });
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
