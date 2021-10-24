import React, {useEffect, useState} from 'react'
import {shuffle} from 'lodash'
import styled from 'styled-components'
import allBooks from '../../books.json'
import {Book} from '../../types'
import BookThumbnail from '../components/BookThumbnail'
import {About} from '@karugamo/components'
import FilterTags, {Filter} from '../components/FilterTags'
import BookModal from '../components/BookModal'
import Modal from '../components/Modal'

export default function App() {
  const [books, setBooks] = useState<Book[]>(allBooks)
  const [activeFilters, setActiveFilters] = useState<Filter[]>([])
  const [currentBook, setCurrentBook] = useState<Book | null>(null)
  const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false)

  useFilterBooks()

  return (
    <Main>
      <Headline>📚 list of best books 📚</Headline>
      <OptionsBar>
        <DesktopOnly>
          <FilterTags onToggle={onToggleFilter} activeFilters={activeFilters} />
        </DesktopOnly>
        <Button onClick={shuffleBooks}>Shuffle</Button>
        <MobileFilterButton onClick={() => setFilterModalOpen(true)}>
          Filter
          {activeFilters.length > 0 && (
            <ActiveFiltersText>
              {`(${activeFilters.length} active)`}
            </ActiveFiltersText>
          )}
        </MobileFilterButton>
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
      {filterModalOpen && (
        <Modal
          onClose={() => setFilterModalOpen(false)}
          isOpen={filterModalOpen}
          dark
        >
          <FilterTags onToggle={onToggleFilter} activeFilters={activeFilters} />
        </Modal>
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
  max-width: 1380px;
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
  margin-left: 16px;
  margin-right: 16px;

  @media (max-width: 1200px) {
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
`

const Headline = styled.h2`
  text-align: center;
`

const MobileFilterButton = styled(Button)`
  display: none;
  @media (max-width: 1200px) {
    display: flex;
  }
`

const DesktopOnly = styled.div`
  @media (max-width: 1200px) {
    display: none;
  }
`

const ActiveFiltersText = styled.span`
  font-weight: 300;
  color: #aaa;
  margin-left: 8px;
`
