import { Router } from 'express';
import { login } from './controllers/authController';
import { getJobs, getJobById } from './controllers/jobsController';
import { authenticateToken } from './middleware/auth';

const router = Router();

router.post('/auth/login', login);
router.get('/jobs', authenticateToken, getJobs);
router.get('/jobs/:id', authenticateToken, getJobById);

export default router;
