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
    return {image}
  })

  writeFileSync('books.json', JSON.stringify(books, null, '  '))
  console.log('Done')
}

main()
