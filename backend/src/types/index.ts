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

export interface User {
  id: number;
  email: string;
  name: string;
  token: string;
}
