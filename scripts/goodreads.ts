import got from 'got'
import {JSDOM} from 'jsdom'
import {BookDetails} from '../types'
import fiction from '../data/shelves/fiction.json'
import nonfiction from '../data/shelves/nonfiction.json'
import {writeFileSync} from 'fs'
import _ from 'lodash'

async function main() {
  const books = _.uniqBy([...fiction, ...nonfiction], 'url')

  let booksWithDetails = []
  let done = 0
  for (const book of books) {
    console.log(`${++done}/${books.length}: ${book.title}`)
    const details = await getBookDetails(book.url)
    console.log(details)
    booksWithDetails.push({...book, ...details})
  }

  writeFileSync('books.json', JSON.stringify(booksWithDetails, null, 2))
}

main()

async function getBookDetails(url: string): Promise<BookDetails> {
  const {body} = await got('https://goodreads.com/' + url)
  const document = new JSDOM(body).window.document

  try {
    return {
      isbn10: getISBN(),
      genres: getGenres(),
      description: getDescription(),
      author: getAuthor()
    }
  } catch (e) {
    console.log('Failed to get ', url)
    console.error(e)
    return {}
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

    return _.uniq(genreElements.map((it) => it.textContent.trim()))
  }

  function getDescription() {
    const descriptionHtml = document.querySelectorAll('#description span')[1]
      .innerHTML
    return stripHtml(descriptionHtml.replace(/<br>/g, '\n'))
  }

  function getAuthor() {
    return document.querySelector('.authorName').textContent
  }
}

function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}
