const express = require('express');
const path = require('path');
const app = express();

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log('Backend is running successfully!');
});
