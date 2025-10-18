# Backend Wizards - Stage 0: Dynamic Profile Endpoint

A simple RESTful API that returns profile information with dynamic cat facts.

## Features
- Returns profile information (email, name, stack)
- Fetches random cat facts from Cat Facts API
- Dynamic timestamp on every request
- Error handling for API failures

## Tech Stack
- Node.js
- Express.js
- Axios
- Morgan
- Express-rate-limit
- CORs

## Local Setup

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone <https://github.com/Lovinaj/dynamic-profile-api>
cd dynamic-profile-api
```

2. Install dependencies:
```bash
npm install
```

3. Run the server:
```bash
node server.js
```

4. Test the endpoint:
Visit `http://localhost:3000/me` in your browser

## API Endpoint

### GET /me
Returns user profile with a random cat fact.

**Response:**
```json
{
  "status": "success",
  "user": {
    "email": "your@email.com",
    "name": "Your Name",
    "stack": "Node.js/Express"
  },
  "timestamp": "2025-10-15T17:53:58.282Z",
  "fact": "Cats have 32 muscles in each ear."
}
```

## Deployment
Deployed on: [Your hosting platform]
Live URL: [Your live URL]

## Author
Lovina Jonathan