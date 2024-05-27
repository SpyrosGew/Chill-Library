class Book{
    constructor(title,author,genre,price){
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.price = price;
    }
}

module.exports = {
    init: function(){
        const sqlite3 = require('sqlite3').verbose();
        this.db = new sqlite3.Database('books.db');
    },
    addBook: function (book) {
        return new Promise((resolve, reject) => {
            const q = `INSERT INTO books (title, author, genre, price) VALUES (?, ?, ?, ?)`;
            // Convert price to a floating-point number
            const price = parseFloat(book.price);
            this.db.run(q, [book.title, book.author, book.genre, price], function(err) {
                if (err) {
                    console.error('Error inserting book:', err.message);
                    return reject(err);
                }
                console.log(`A row has been inserted with row id ${this.lastID}`);
                resolve(this.lastID);
            });
        });
    },
    getBooksByString: async function(string) {
        return new Promise((resolve, reject) => {
            const q = 'SELECT * FROM books WHERE title LIKE ?';
            const searchString = `%${string}%`;
            
            this.db.all(q, [searchString], (err, rows) => {
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
}