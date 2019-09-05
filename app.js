const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/books', function (req, res, next) {
    require(__dirname + '/api/books/books-api')(req, res, next)
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Application started on port ${port}!`));

module.exports = app;