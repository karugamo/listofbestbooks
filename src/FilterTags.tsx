import React from 'react'
import styled, {css} from 'styled-components'
import {Book} from '../types'
import Tag from './Tag'
import books from '../books.json'

type Genre = string

const genres = [
  'Classics',
  'Fiction',
  'Historical',
  'Young Adult',
  'Science Fiction',
  'Dystopia',
  'Politics',
  'Fantasy',
  'Romance',
  'Childrens',
  'Adventure',
  'Teen',
  'Feminism',
  'Philosophy',
  'War',
  'Mystery',
  'Thriller',
  'Crime',
  'Humor',
  'Horror',
  'LGBT',
  'Classic Literature',
  'Health',
  'Psychology',
  'Religion',
  'Nonfiction',
  'History',
  'Biography',
  'Science',
  'Business',
  'Self Help',
  'Sociology',
  'Travel',
  'Nature'
]

export type Filter = {
  name: string
  function: (book: Book) => boolean
}

type FilterTagsProps = {
  onToggle: (filter: Filter) => void
  activeFilters: Filter[]
}

export default function FilterTags({onToggle, activeFilters}: FilterTagsProps) {
  const filterTagProps = {
    onToggle,
    activeFilters
  }

  return (
    <Container>
      {genres.map((genre) => (
        <FilterTag
          key={genre}
          {...filterTagProps}
          filter={createGenreFilter(genre)}
        />
      ))}
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  justify-content: flex-start;
  flex-wrap: wrap;
  max-width: 1100px;

  @media (max-width: 1200px) {
    display: none;
  }
`

function createGenreFilter(genre: Genre) {
  return {
    name: genre,
    function: (book: Book) => book?.genres?.includes(genre)
  }
}

type FilterTagProps = {
  filter: Filter
  onToggle: (filter: Filter) => void
  activeFilters: Filter[]
}

function FilterTag({filter, activeFilters, onToggle}: FilterTagProps) {
  const isActive = activeFilters
    .map((filter) => filter.name)
    .includes(filter.name)

  const numberOfBooks = [...activeFilters, filter]
    .map((it) => it.function)
    .reduce(
      (filteredBooks, filterFunction) => filteredBooks.filter(filterFunction),
      books
    ).length

  return (
    <StyledTag
      disabled={numberOfBooks === 0}
      inverted={isActive}
      onClick={() => onToggle(filter)}
    >
      {filter.name} <NumberOfBooks>({numberOfBooks})</NumberOfBooks>
    </StyledTag>
  )
}

const NumberOfBooks = styled.span`
  display: inline-block;
  width: 48px;
  color: #aaa;
  font-weight: 300;
`

const StyledTag = styled(Tag)<{disabled: boolean}>`
  margin-bottom: 7px;
  ${({disabled}) =>
    disabled
      ? css`
          opacity: 0.3;
        `
      : ''}
`
