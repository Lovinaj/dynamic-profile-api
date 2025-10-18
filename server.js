const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use(morgan('dev')); // Logs every request

// CORS 
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  methods: ['GET'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per 15 minutes
  message: {
    status: 'error',
    message: 'Too many requests, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.get("/", (req, res)=>{
    res.redirect("/me")
})

// Main endpoint
app.get('/me', async (req, res) => {
  try {
    // Log request
    console.log(`[${new Date().toISOString()}]`);
    

    // Get current timestamp
    const timestamp = new Date().toISOString();
    
    // Fetch cat fact with timeout
    const catFactResponse = await axios.get('https://catfact.ninja/fact', {
      timeout: 10000,
      headers: {
        'Accept': 'application/json'
      }
    });
    console.log('Cat fact fetched successfully:', catFactResponse.data);

    const catFact = catFactResponse.data.fact;
    
    // User Details
    const user = {
      status: "success",
      user: {
        email: process.env.USER_EMAIL || "lovejon218@gmail.com",
        name: process.env.USER_NAME || "Lovina Jonathan",
        stack: process.env.USER_STACK || "Node.js/Express"
      },
      timestamp: timestamp,
      fact: catFact
    };
    
    // Sending response with proper headers
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(user);
    
  } catch (error) {
    console.error('Error:', error.message);
    
    // Fallback response
    res.status(503).json({
      status: "error",
      message: "Failed to fetch cat fact. Service temporarily unavailable.",
      user: {
        email: process.env.USER_EMAIL || "lovejon218@gmail.com",
        name: process.env.USER_NAME || "Lovina Jonathan",
        stack: process.env.USER_STACK || "Node.js/Express"
      },
      timestamp: new Date().toISOString(),
      fact: "Cats are amazing creatures! (Fallback fact)"
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Page not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});