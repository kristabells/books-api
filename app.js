const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/books', function (req, res, next) {
    require(__dirname + '/src/api/books/books-api')(req, res, next)
});

app.use('/api/health', function (req, res, next) {
    require(__dirname + '/src/api/health-check/health-check-api')(req, res, next)
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Application started on port ${port}!`));

module.exports = app;