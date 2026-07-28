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

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Forest Hiker',
  rating: 4.7,
  price: 497,
});

testTour
  .save()
  .then(() => {
    console.log('Test tour saved successfully');
  })
  .catch((err) => {
    console.error('Error saving test tour:', err);
  });

app.listen(8000, () => {
  console.log('App running on port 8000...');
});
