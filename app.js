const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('books.db');

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
        db.run(q, [book.title, book.author, book.genre, book.price], function(err) {
            if (err) {
                console.error('Error inserting book:', err.message);
                return reject(err);
            }
            console.log(`A row has been inserted with rowid ${this.lastID}`);
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
            books = [];
            for(row of rows){
                book = new Book(row.title,row.author,row.genre,row.price)
                books.push(book);
            }
            resolve(book);
        });
    });
}

const userInput = 'rings';

async function main() {
    try {
        const result = await getBooksByString(db, userInput);
        console.log(result);

        const book = new Book("lol", 'mum', "adventure", 12);
        await addBook(db, book);

        console.log(await getBooksByString(db,"lol"));
    } catch (err) {
        console.error(err);
    }
}

main();
