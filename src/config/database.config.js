const { Pool } = require('pg');
const config = require('./env/index');
// const cloudinary = require('../../utils/cloudinary');

const connectionString = config.DATABASE_URL;
const pool = new Pool({ connectionString });

//This is to check for successful connection.
(() => {
    pool.query('SELECT NOW()', (err, res) => {
        if (err) console.log('Database Connection Failed! Bad Config: ', err);
        if (res) console.log('Connected to PostgreSQL Database');
    });
})();

const runQuery = async (query, values = []) => {
    const { rows } = await pool.query(query, values);
    return rows;
};
module.exports = {runQuery}; 

// const express = require('express');
// const app = express();

// // Example route for uploading an image
// app.post('/upload/image', upload.single('image'), (req, res) => {
//   // Handle the Cloudinary upload response
//   console.log('Image uploaded to Cloudinary:', req.file.url);
//   // You can save the image URL to your database or send it in the response
//   res.json({ success: true, message: 'Image uploaded successfully', url: req.file.url });
// });
