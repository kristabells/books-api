require('mocha');
require('should');
const booksService = require('../../../src/api/books/books-service');

describe('getBooks', function() {

    it('should return totalItems and an array of books', async function() {
        const results = await booksService.getBooks('Northwestern Mutual', 0, 10)
        results.should.have.property('totalItems');
        results.should.have.property('books');

        results.books.should.be.an.instanceof(Array)
        results.totalItems.should.be.an.instanceof(Number)
    });

    it('should only return the max number of results', async function() {
        const results = await booksService.getBooks('Northwestern Mutual', 0, 10)
        results.books.length.should.equal(10);
    });
});

describe('pickBookData', function() {

    it('should return only a subset of book data', async function() {
        const book = {
            "kind": "books#volume",
            "id": "i08rAQAAMAAJ",
            "etag": "+GEgvU1IJ78",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/i08rAQAAMAAJ",
            "volumeInfo": {
                "title": "Annual Report",
                "authors": [
                    "Northwestern Mutual Life Insurance Company"
                ],
                "publishedDate": "1944",
                "industryIdentifiers": [
                    {
                        "type": "OTHER",
                        "identifier": "UIUC:30112106993592"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": false
                },
                "printType": "BOOK",
                "categories": [
                    "Insurance companies"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "1.1.0.0.preview.0",
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=i08rAQAAMAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=i08rAQAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                },
                "language": "en",
                "previewLink": "http://books.google.com/books?id=i08rAQAAMAAJ&q=Northwestern+Mutual+Annual+Report&dq=Northwestern+Mutual+Annual+Report&hl=&as_pt=BOOKS&cd=1&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=i08rAQAAMAAJ&dq=Northwestern+Mutual+Annual+Report&hl=&as_pt=BOOKS&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/Annual_Report.html?hl=&id=i08rAQAAMAAJ"
            },
            "saleInfo": {
                "country": "US",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "US",
                "viewability": "NO_PAGES",
                "embeddable": false,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": false
                },
                "webReaderLink": "http://play.google.com/books/reader?id=i08rAQAAMAAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
                "accessViewStatus": "NONE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "<b>Northwestern Mutual</b> Life Insurance Company. The amount estimated for due <br>\nand accrued taxes payable in 1947 is $3,700,000. The surplus, which consists of <br>\nthe two investment reserves and the general contingency reserve, totals&nbsp;..."
            }
        }
        const pickedBookData = await booksService.pickBookData(book)
        pickedBookData.should.not.have.property('kind');
        pickedBookData.should.not.have.property('etag');
        pickedBookData.should.not.have.property('selfLink');
        pickedBookData.should.not.have.property('volumeInfo');
        pickedBookData.should.not.have.property('saleInfo');
        pickedBookData.should.not.have.property('accessInfo');
        pickedBookData.should.not.have.property('searchInfo');

        pickedBookData.should.have.property('id');
        pickedBookData.should.have.property('title');
        pickedBookData.should.have.property('authors');
        pickedBookData.should.have.property('thumbnail');
    });
});