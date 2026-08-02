const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');
require('dotenv').config({ path: './config.env' });

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
    console.log('DB connection error:', err);
  });

//Read JSON file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);
//Import data into DB
const importDAta = async () => {
  try {
    await Tour.create(tours);
    console.log('Data imported successfully');
    process.exit();
  } catch (err) {
    console.log('Error importing data:', err);
  }
};

//Delete all data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted successfully');
    process.exit();
  } catch (err) {
    console.error('Error deleting data:', err);
  }
};

//Check command line arguments
if (process.argv[2] === '--import') {
  importDAta();
}

if (process.argv[2] === '--delete') {
  deleteData();
}
