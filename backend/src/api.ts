import serverless from 'serverless-http'
import app from './index'

// When running as a Netlify Function, requests come through paths like
// /.netlify/functions/api/auth/login. The basePath option ensures Express
// sees just /auth/login, so our routes like '/auth/login' and '/' match
// both locally and in the serverless environment.
export const handler = serverless(app, {
  basePath: '/.netlify/functions/api'
})
