import {writeFileSync} from 'fs'
import got from 'got'
import {JSDOM} from 'jsdom'
import {Book} from '../types'

async function main() {
  console.log('Downloading best books..')
  const {body} = await got(
    'https://www.goodreads.com/list/show/1.Best_Books_Ever'
  )
  const document = new JSDOM(body).window.document

  const bookElements = document.querySelectorAll('[itemtype*=Book]')
  const books: Book[] = Array.from(bookElements).map((bookElement) => {
    const image = bookElement
      .querySelector('[itemprop=image]')
      .getAttribute('src')

    const url = bookElement.querySelector('[itemprop=url]').getAttribute('href')
    const title = bookElement.querySelector('[itemprop=name]').innerHTML
    return {image, url, title}
  })

  for (const book of books) {
    book.isbn10 = await getISBN(book.url)
    console.log(book.isbn10)
  }

  writeFileSync('books.json', JSON.stringify(books, null, '  '))
  console.log('Done')
}

main()

async function getISBN(url: string): Promise<string> {
  const {body} = await got('https://goodreads.com/' + url)
  const document = new JSDOM(body).window.document
  const isbn10 = document
    .querySelectorAll('.infoBoxRowItem')[1]
    .textContent.trim()
    .slice(0, 10)
  if (/[0-9]{10}/.test(isbn10)) return isbn10
}
