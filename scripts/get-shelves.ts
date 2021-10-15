import {writeFileSync} from 'fs'
import got from 'got'
import {JSDOM} from 'jsdom'
import {Book} from '../types'
import {showColors} from 'dominant-colors'
import envmate from 'envmate'
import {str} from 'envalid'

const env = envmate({
  GOODREADS_COOKIE: str()
})

async function main() {
  await downloadShelf('nonfiction')
  await downloadShelf('fiction')
}

main()

async function downloadShelf(shelf: string) {
  console.log(`Downloading best books in ${shelf}..`)

  let books = []

  for (let page = 1; page <= 5; page++) {
    console.log(`On page ${page}...`)
    const newBooks = await getBooks(shelf, page)

    books.push(...newBooks.filter((book) => book.rating >= 3.9))
  }

  console.log(`Found ${books.length} books.`)

  writeFileSync(
    `./data/shelves/${shelf}.json`,
    JSON.stringify(books, null, '  ')
  )
  console.log(`${shelf}.json created`)
}

async function getBooks(shelf: string, page: number): Promise<Book[]> {
  const {body} = await got(
    `https://www.goodreads.com/shelf/show/${shelf}?page=${page}`,
    {
      headers: {
        cookie: env.GOODREADS_COOKIE
      }
    }
  )
  const document = new JSDOM(body).window.document

  const bookElements = document.querySelectorAll('.leftContainer .elementList')
  return await Promise.all(
    Array.from(bookElements).map(async (bookElement) => {
      try {
        return await parseBookElement(bookElement)
      } catch (e) {
        console.log(e)
        console.log(bookElement.innerHTML)
      }
    })
  )
}

async function parseBookElement(bookElement: Element): Promise<Book> {
  const image = bookElement.querySelector('a img').getAttribute('src')

  const color: string = (await showColors(image, 1))[0]

  const url = bookElement.querySelector('a').getAttribute('href')
  const title = bookElement.querySelector('a img').getAttribute('alt')

  const miniRatingElement = bookElement.querySelector(
    '.smallText:not(.authorName)'
  )

  const [
    avgRatingString,
    numRatingString,
    publishedString
  ] = miniRatingElement.textContent.trim().split('—')

  const rating = parseFloat(avgRatingString.replace('avg rating ', '').trim())
  const numRatings = parseInt(numRatingString.trim().replace(/,/g, ''))
  const published = parseInt(publishedString.trim().replace('published ', ''))

  return {image, url, title, color, rating, numRatings, published}
}
