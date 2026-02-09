import axios, { AxiosError } from 'axios';

const apiClient = axios.create({
  baseURL: process.env.EXTERNAL_API_URL || 'https://interview.techliana.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const externalApiService = {
  /**
   * Authenticate user with external API
   */
  async login(email: string, password: string) {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get paginated list of jobs with optional search
   */
  async getJobs(token: string, params: { page?: number; limit?: number; search?: string }) {
    try {
      const response = await apiClient.get('/jobs', {
        headers: { Authorization: token },
        params
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get job details by ID
   */
  async getJobById(token: string, id: number) {
    try {
      const response = await apiClient.get(`/jobs/${id}`, {
        headers: { Authorization: token }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
