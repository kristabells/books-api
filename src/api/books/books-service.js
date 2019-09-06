const axios = require('axios');
const _ = require('lodash');

const googleBooksBaseUrl = 'https://www.googleapis.com/books/v1';

/**
 * Get a list of books from the Google Books API that match a query String
 * https://developers.google.com/books/docs/v1/reference/volumes/list
 *
 * @param query - String
 * @param offset (dependent on pageNumber and maxResults) - Number
 * @param maxResults - Number
 * @return books - Object
 */
function getBooksFromGoogleBooks(query, offset, maxResults) {
    const queryString =
        `q=intitle:${query}&startIndex=${offset}&maxResults=${maxResults}&printType=books&langRestrict=en`

    return axios.get(encodeURI(`${googleBooksBaseUrl}/volumes?${queryString}`))
        .then(response => {
            const books = response.data.items.map(item => pickBookData(item))
            return {books: _.orderBy(books, 'title', 'asc'), totalItems: response.data.totalItems};
        })
        .catch(error => {
            throw error;
        });
}

/**
 * Pick a subset of book data
 *
 * @param data - Object
 * @return book - Object
 */
function pickBookData(data) {
    const book = _.pick(data.volumeInfo, [
        'title', 'authors'
    ]);

    _.extend(book, {
        id: data.id,
        thumbnail: _.get(data, 'volumeInfo.imageLinks.thumbnail'),
    });

    return book;
}

module.exports = {
    getBooks: getBooksFromGoogleBooks,
    pickBookData
}