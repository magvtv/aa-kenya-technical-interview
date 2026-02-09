import { Request, Response, NextFunction } from 'express';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  } // explicitly return the response

  // Based on the requirement "Response: {'token': 'Bearer interview-token-2024'}"
  // Use a simple check for this specific token as requested/implied by the static response.
  if (token === 'interview-token-2024') {
    next();
  } else {
    res.status(403).json({ message: 'Invalid token.' });
  }
};
