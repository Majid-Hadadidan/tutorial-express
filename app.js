const express = require('express');
const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Welcome to the API', app: 'Express', version: '1.0.0' });
});
app.post('/', (req, res) => {
  res.status(200).json({ message: 'Post request received' });
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
