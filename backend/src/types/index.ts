export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string;
  jobType: string; // Changed from 'type'
  postedDate: string; // Changed from 'postedAt'
  requirements: string[]; // Added
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalJobs: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface JobsResponse {
  jobs: Job[];
  pagination: Pagination;
}

export interface User {
  id: number;
  email: string;
  name: string;
  token: string;
}
