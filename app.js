const sqlite3 = require('sqlite3').verbose();
const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database('books.db');

app.use(bodyParser.json());
app.use(express.static('public'));

class Book {
    constructor(title, author, genre, price) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.price = price;
    }
}

function addBook(db, book) {
    return new Promise((resolve, reject) => {
        const q = `INSERT INTO books (title, author, genre, price) VALUES (?, ?, ?, ?)`;
        // Convert price to a floating-point number
        const price = parseFloat(book.price);
        db.run(q, [book.title, book.author, book.genre, price], function(err) {
            if (err) {
                console.error('Error inserting book:', err.message);
                return reject(err);
            }
            console.log(`A row has been inserted with row id ${this.lastID}`);
            resolve(this.lastID);
        });
    });
}


function getBooksByString(db, string) {
    return new Promise((resolve, reject) => {
        const q = 'SELECT * FROM books WHERE title LIKE ?';
        const searchString = `%${string}%`;
        
        db.all(q, [searchString], (err, rows) => {
            if (err) {
                console.log('Error accessing the DB.');
                return reject(err);
            }
            const books = [];
            for (const row of rows) {
                const book = new Book(row.title, row.author, row.genre, row.price);
                books.push(book);
            }
            resolve(books);
        });
    });
}

app.get('/books/:string', async (req, res) => {
    try {
        const searchString = req.params.string;
        const books = await getBooksByString(db, searchString);
        
        if (books.length === 0) {
            res.status(404).json({ message: 'No books found' });
        } else {
            res.status(200).json(books);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/books', async (req,res)=>{
    const book = req.body;
    console.log(book);
    try {
        await addBook(db, book);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
