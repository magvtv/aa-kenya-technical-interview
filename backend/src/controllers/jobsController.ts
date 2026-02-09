import { Request, Response } from 'express';
import { externalApiService } from '../services/externalApi';
import axios from 'axios';

export const getJobs = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string || '';

    // Get token from request headers
    const token = req.headers.authorization as string;

    // Forward request to external API
    const data = await externalApiService.getJobs(token, { page, limit, search });
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

export const getJobById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);

    // Get token from request headers
    const token = req.headers.authorization as string;

    // Forward request to external API
    const data = await externalApiService.getJobById(token, id);
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
