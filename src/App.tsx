import React from 'react'
import styled from 'styled-components'
import books from '../books.json'
import BookThumbnail from './BookThumbnail'

export default function App() {
  return (
    <Main>
      <BooksContainer>
        {books.map((book) => (
          <BookThumbnail key={book.image} {...book} />
        ))}
      </BooksContainer>
    </Main>
  )
}

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #eeeee4;
  color: #242422;
  font-size: 75px;
`

const BooksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
`
