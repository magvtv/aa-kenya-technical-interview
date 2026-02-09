import { Request, Response } from 'express';
import { externalApiService } from '../services/externalApi';
import axios from 'axios';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Forward login request to external API
    const data = await externalApiService.login(email, password);
    res.json(data);
  } catch (error) {
    // Forward error response from external API
    if (axios.isAxiosError(error) && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
