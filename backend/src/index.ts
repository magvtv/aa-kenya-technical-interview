import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import routes from './routes';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Job Listing API is running');
});

export default app;

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}
