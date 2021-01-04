import React, {useState} from 'react'
import {shuffle} from 'lodash'
import styled from 'styled-components'
import allBooks from '../books.json'
import {Book} from '../types'
import BookThumbnail from './BookThumbnail'
import {About} from '@karugamo/components'

export default function App() {
  const [books, setBooks] = useState<Book[]>(allBooks)

  return (
    <Main>
      <h2>📚 browse good books 📚</h2>
      <Button onClick={shuffleBooks}>Shuffle</Button>
      <BooksContainer>
        {books.map((book) => (
          <BookThumbnail key={book.image} {...book} />
        ))}
      </BooksContainer>
      <About />
    </Main>
  )

  function shuffleBooks() {
    setBooks((books) => shuffle(books))
  }
}

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  color: #242422;
  font-size: 30px;
`

const BooksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
`

const Button = styled.button`
  font-size: 20px;
  padding: 12px 40px;
  border: 2px solid #242422;
  background-color: transparent;
  color: #242422;
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 7px;
  box-shadow: 0px 2px white;

  transition: background-color 0.2s, color 0.2s;

  :hover {
    background-color: #242422;
    color: white;
  }

  :active {
    transform: translate(0, 2px);
    box-shadow: 0px 0px white;
  }
`
