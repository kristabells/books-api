const express = require('express');
const router = express.Router();
const booksService = require('./books-service')
const _ = require('lodash');

/*
*   The base URL for books is '/api/books'
*/

router.get('/', async function(request, response, next) {
    try {
        const searchText = _.get(request, 'query.q');
        const pageNumber = _.get(request, 'query.page', 0)
        const maxResults = _.get(request, 'query.maxResults', 10)
        const offset = pageNumber * maxResults

        const results = await booksService.getBooks(searchText, offset, maxResults);
        return response.json({totalItems: results.totalItems, books: results.books})
    } catch (e) {
        console.log(e)
        response.err(e)
    }
});

module.exports = router;
