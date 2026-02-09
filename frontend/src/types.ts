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
