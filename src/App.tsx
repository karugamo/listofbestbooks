import React, {useEffect, useState} from 'react'
import {shuffle} from 'lodash'
import styled from 'styled-components'
import allBooks from '../books.json'
import {Book} from '../types'
import BookThumbnail from './BookThumbnail'
import {About} from '@karugamo/components'
import FilterTags, {Filter} from './FilterTags'
import BookModal from './BookModal'

export default function App() {
  const [books, setBooks] = useState<Book[]>(allBooks)
  const [activeFilters, setActiveFilters] = useState<Filter[]>([])
  const [currentBook, setCurrentBook] = useState<Book | null>(null)

  useFilterBooks()

  return (
    <Main>
      <Headline>📚 browse good books 📚</Headline>
      <OptionsBar>
        <FilterTags onToggle={onToggleFilter} activeFilters={activeFilters} />
        <Button onClick={shuffleBooks}>Shuffle</Button>
      </OptionsBar>
      <BooksContainer>
        {books.map((book) => (
          <BookThumbnail key={book.url} onClick={setCurrentBook} book={book} />
        ))}
      </BooksContainer>
      <About />
      {currentBook && (
        <BookModal book={currentBook} onClose={() => setCurrentBook(null)} />
      )}
    </Main>
  )

  function useFilterBooks() {
    useEffect(() => {
      const filteredBooks = activeFilters.reduce(
        (acc, filter) => acc.filter(filter.function),
        allBooks
      )

      setBooks(filteredBooks)
    }, [activeFilters])
  }

  function shuffleBooks() {
    setBooks((books) => shuffle(books))
  }

  function onToggleFilter(filter: Filter) {
    const isActive = activeFilters.map(({name}) => name).includes(filter.name)

    setActiveFilters(
      isActive
        ? activeFilters.filter(({name}) => name !== filter.name)
        : [...activeFilters, filter]
    )
  }
}

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  color: #f6f4f4;
  font-size: 30px;
`

const BooksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Button = styled.button`
  font-size: 20px;
  padding: 12px 40px;
  border: 2px solid #f6f4f4;
  background-color: transparent;
  color: #f6f4f4;
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 7px;
  box-shadow: 0px 2px white;

  transition: background-color 0.2s, color 0.2s;

  :active {
    transform: translate(0, 2px);
    box-shadow: 0px 0px white;
  }
`

const OptionsBar = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1380px;
  width: 100%;

  @media (max-width: 1200px) {
    justify-content: center;
    margin-bottom: 10px;
  }
`

const Headline = styled.h2`
  text-align: center;
`
