# API Test Requests

Here are sample `curl` requests you can use to test the API. You can import these into Postman or run them directly in your terminal.

The base URL is: `https://interview.techliana.com`

## 1. Authentication (Login)

**Endpoint:** `POST /auth/login`

**Request:**
```bash
curl -X POST https://interview.techliana.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "candidate@test.com",
    "password": "interview2024"
  }'
```

**Expected Response:**
```json
{
  "token": "Bearer interview-token-2024",
  "message": "Login successful"
}
```

---

## 2. Get Job Listings

**Endpoint:** `GET /jobs`

**Headers:**
- `Authorization`: `Bearer interview-token-2024` (Use the token from Login)

**Request:**
```bash
curl https://interview.techliana.com/jobs?page=1&limit=5 \
  -H "Authorization: Bearer interview-token-2024"
```

**Expected Response:**
```json
{
  "jobs": [
    {
      "id": 1,
      "title": "Senior Frontend Developer",
      "company": "TechCorp Solutions",
      "location": "Nairobi, Kenya",
      "salary": "KES 200,000 - 300,000",
      "jobType": "Full-time",
      "postedDate": "2024-02-01",
      ...
    }
  ],
  "pagination": {
    "currentPage": "1",
    "totalPages": 6,
    "totalJobs": 30,
    "limit": "5",
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

## 3. Search Jobs

**Endpoint:** `GET /jobs`

**Request:**
```bash
curl "https://interview.techliana.com/jobs?search=Frontend" \
  -H "Authorization: Bearer interview-token-2024"
```

---

## 4. Get Job Details

**Endpoint:** `GET /jobs/:id`

**Request:**
```bash
curl https://interview.techliana.com/jobs/1 \
  -H "Authorization: Bearer interview-token-2024"
```

**Expected Response:**
```json
{
  "id": 1,
  "title": "Senior Frontend Developer",
  "company": "TechCorp Solutions",
  "location": "Nairobi, Kenya",
  "description": "...",
  "requirements": [
    "5+ years experience with React/Vue",
    "Strong JavaScript/TypeScript skills"
  ],
  "jobType": "Full-time",
  "postedDate": "2024-02-01"
}
```
