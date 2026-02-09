import { Request, Response } from 'express';
import { jobs } from '../data/jobs';

export const getJobs = (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = String(req.query.search || '').toLowerCase();

  let filteredJobs = jobs;

  if (search) {
    filteredJobs = jobs.filter(job => 
      job.title.toLowerCase().includes(search) || 
      job.company.toLowerCase().includes(search)
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  res.json({
    jobs: paginatedJobs,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(filteredJobs.length / limit),
      totalJobs: filteredJobs.length,
      limit,
      hasNextPage: endIndex < filteredJobs.length,
      hasPrevPage: page > 1
    }
  });
};

export const getJobById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const job = jobs.find(j => j.id === id);

  if (job) {
    res.json(job);
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
};
