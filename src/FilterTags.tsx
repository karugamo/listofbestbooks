import React from 'react'
import styled from 'styled-components'
import {Book} from '../types'
import Tag from './Tag'

type Genre = string

const genres = [
  'Young Adult',
  'Fiction',
  'Science Fiction',
  'Dystopia',
  'Fantasy',
  'Romance',
  'Adventure',
  'Childrens',
  'Audiobook',
  'Middle Grade',
  'Classics',
  'Science Fiction Fantasy',
  'Historical',
  'Historical Fiction',
  'Nonfiction',
  'Academic',
  'School',
  'Literature',
  'Novels',
  'Read For School',
  'Adult',
  'Paranormal',
  'Contemporary',
  'Classic Literature',
  'Mystery',
  'Cultural',
  'Adult Fiction'
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
