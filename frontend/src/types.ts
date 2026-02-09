/**
 * Frontend types
 * Note: These types should match the backend types in backend/src/types/index.ts
 * Consider creating a shared types package for larger projects
 */
export interface Job {
  id: number
  title: string
  company: string
  location: string
  jobType: string
  salary: string
  postedDate: string
  description: string
  requirements?: string[]
}

export interface Pagination {
  page: number
  limit: number
  totalJobs: number
  totalPages: number
}

export interface JobsResponse {
  jobs: Job[]
  pagination: Pagination
}
