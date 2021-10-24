import React from 'react'
import styled from 'styled-components'
import { Book } from '../../types'
import BookCover from './BookCover'
import Cover from './Cover'

export default function BookThumbnail({
  book,
  onClick
}: {
  book: Book
  onClick: (book: Book) => void
}) {
  const {title, color} = book
  return (
    <LinkContainer
      title={title}
      onClick={() => onClick(book)}
      backgroundColor={color}
    >
      <BookCover
        rotate={0}
        rotateHover={25}
        transitionDuration={0.5}
        bgColor={color}
      >
        <Cover book={book} />
      </BookCover>
    </LinkContainer>
  )
}

const LinkContainer = styled.div<{
  backgroundColor: string
}>`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background-color: transparent;
  cursor: pointer;
  position: relative;
  margin-top: 32px;
  margin-left: 8px;
  margin-right: 8px;

  transition: transform 0.1s ease-in-out;

  :hover {
    transform: scale(1.1);
    z-index: 10;
  }
`
