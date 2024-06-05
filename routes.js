const books = require('./books');
books.init();

module.exports = {
    init: function(app){
        app.get('/books/:string', async (req, res) => {
            try {
                const searchString = req.params.string;
                const result = await books.getBooksByString(searchString);
                
                if (result.length === 0) {
                    res.status(404).json({ message: 'No books found' });
                } else {
                    res.status(200).json(result);
                }
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        }),
        
        app.post('/books', async (req,res)=>{
            console.log("hi")
            const book = req.body;
            console.log(book);
            try {
                await books.addBook(book);
                res.sendStatus(200);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        })
    }
}

