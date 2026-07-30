const app = require('./app');
require('dotenv').config({ path: './config.env' });

const mongoose = require('mongoose');

const DB = process.env.DATABASE_URL.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });



app.listen(8000, () => {
  console.log('App running on port 8000...');
});
