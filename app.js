const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('public'));

const routes = require('./routes.js');
routes.init(app);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
