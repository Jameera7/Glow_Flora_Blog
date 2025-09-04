const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Dummy blog data
const blogs = [
  { id: 1, title: 'First Blog', content: 'This is the first blog post.' },
  { id: 2, title: 'Second Blog', content: 'This is the second blog post.' }
];

app.get('/api/blogs', (req, res) => {
  res.json(blogs);
});

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
