import got from 'got'
import {JSDOM} from 'jsdom'
import {BookDetails} from '../types'
import fiction from '../data/shelves/fiction.json'
import nonfiction from '../data/shelves/nonfiction.json'
import {writeFileSync} from 'fs'

async function main() {
  const books = [...fiction, ...nonfiction]

  let booksWithDetails = []
  let done = 0
  for (const book of books) {
    const details = await getBookDetails(book.url)
    console.log(`${++done}/${books.length}: ${book.title}`)
    booksWithDetails.push({...book, ...details})
  }

  writeFileSync('books.json', JSON.stringify(booksWithDetails, null, 2))
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
