import { Router } from 'express';
import { login } from './controllers/authController';
import { getJobs, getJobById } from './controllers/jobsController';
import { authenticateToken } from './middleware/auth';

const router = Router()

// Prefix routes with /api so they match the paths used by the frontend
// and Netlify redirect (/api/* -> /.netlify/functions/api/:splat).
router.post('/api/auth/login', login)
router.get('/api/jobs', authenticateToken, getJobs)
router.get('/api/jobs/:id', authenticateToken, getJobById)

export default router
