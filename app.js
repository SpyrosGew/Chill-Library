const express = require("express");
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const initializeDatabase = require('./database');
const routes = require('./routes.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Initialize the database and start the server
initializeDatabase(sqlite3, fs, path)
  .then(() => {
    console.log('Database initialization complete. Starting server...');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize the database:', err);
    process.exit(1);
  });

// Initialize routes
routes.init(app);
