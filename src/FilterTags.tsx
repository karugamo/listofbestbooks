import React from 'react'
import styled from 'styled-components'
import {Book} from '../types'
import Tag from './Tag'

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

  return (
    <StyledTag inverted={isActive} onClick={() => onToggle(filter)}>
      {filter.name}
    </StyledTag>
  )
}

const StyledTag = styled(Tag)`
  margin-bottom: 7px;
`
