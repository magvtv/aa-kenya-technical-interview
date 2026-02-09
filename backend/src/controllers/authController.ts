import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'interview-token-2024';

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Simple hardcoded check as requested
  if (email === 'candidate@test.com' && password === 'interview2024') {
    // const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({
      token: "Bearer interview-token-2024",
      message: "Login successful"
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
