const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Middleware
app.use(express.json());
// Simple page routes (serve HTML files)
const HTML_DIR = path.join(__dirname, '..', 'FRONTEND', 'HTML');
app.get('/', (req, res) => res.sendFile(path.join(HTML_DIR, 'index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(HTML_DIR, 'about.html')));
app.get('/services', (req, res) => res.sendFile(path.join(HTML_DIR, 'services.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(HTML_DIR, 'contact.html')));
app.get('/register', (req, res) => res.sendFile(path.join(HTML_DIR, 'register.html')));
app.get('/login', (req, res) => res.sendFile(path.join(HTML_DIR, 'login.html')));
app.get('/forgot-password', (req, res) => res.sendFile(path.join(HTML_DIR, 'forgot-password.html')));

// Serve static assets (CSS/JS/ASSETS)
app.use(express.static(path.join(__dirname, '..', 'FRONTEND')));



// Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Visit: http://localhost:${PORT}/HTML/index.html`);
});

