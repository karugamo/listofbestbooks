import {writeFileSync} from 'fs'
import got from 'got'
import {JSDOM} from 'jsdom'
import {Book, BookDetails} from '../types'
import {showColors} from 'dominant-colors'

async function main() {
  console.log('Downloading best books..')
  const {body} = await got(
    'https://www.goodreads.com/list/show/1.Best_Books_Ever'
  )
  const document = new JSDOM(body).window.document

  const bookElements = document.querySelectorAll('[itemtype*=Book]')
  const books: Book[] = await Promise.all(
    Array.from(bookElements).map(async (bookElement) => {
      const image = bookElement
        .querySelector('[itemprop=image]')
        .getAttribute('src')

      const color: string = (await showColors(image, 1))[0]

      const url = bookElement
        .querySelector('[itemprop=url]')
        .getAttribute('href')
      const title = bookElement.querySelector('[itemprop=name]').innerHTML
      return {image, url, title, color}
    })
  )

  for (const book of books) {
    const {isbn10, genres} = await getBookDetails(book.url)
    book.isbn10 = isbn10
    book.genres = genres
    console.log(book.isbn10)
  }

  writeFileSync('books.json', JSON.stringify(books, null, '  '))
  console.log('Done')
}

main()

async function getBookDetails(url: string): Promise<BookDetails> {
  const {body} = await got('https://goodreads.com/' + url)
  const document = new JSDOM(body).window.document

  return {
    isbn10: getISBN(),
    genres: getGenres()
  }

  function getISBN(): string {
    const isbn10 = document
      .querySelectorAll('.infoBoxRowItem')[1]
      .textContent.trim()
      .slice(0, 10)
    if (/[0-9]{10}/.test(isbn10)) return isbn10
  }

  function getGenres(): string[] {
    const genreElements = Array.from(
      document.querySelectorAll('.bigBoxContent .elementList .left a')
    )

    return genreElements.map((it) => it.textContent.trim())
  }
}
