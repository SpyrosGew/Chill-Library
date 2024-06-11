const books = require('./books.js');
const path = require('path');

function initializeDatabase(sqlite3, fs) {
    const dbFile = path.join(__dirname, 'books.db');

    return new Promise((resolve, reject) => {
        console.log('Checking if database file exists...');
        if (!fs.existsSync(dbFile)) {
            console.log('Database file not found. Creating a new database...');
            const db = new sqlite3.Database(dbFile, (err) => {
                if (err) {
                    console.error('Error opening database:', err.message);
                    reject('Error opening database: ' + err.message);
                } else {
                    console.log('Database created successfully.');

                    db.serialize(() => {
                        db.run(`CREATE TABLE IF NOT EXISTS books (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            author VARCHAR(25) NOT NULL,
                            title VARCHAR(40) NOT NULL,
                            genre VARCHAR(20) NOT NULL,
                            price REAL NOT NULL
                        )`, (err) => {
                            if (err) {
                                console.error('Error creating books table:', err.message);
                                reject('Error creating books table: ' + err.message);
                            } else {
                                console.log('Books table created successfully.');
                                // Set the database connection in the books module
                                books.setDatabaseConnection(db);
                                resolve();
                            }
                        });
                    });
                }
            });
        } else {
            // If the database file exists, open a connection to it
            const db = new sqlite3.Database(dbFile);
            console.log('Database file already exists.');
            // Set the database connection in the books module
            books.setDatabaseConnection(db);
            resolve();
        }
    });
}

module.exports = initializeDatabase;
