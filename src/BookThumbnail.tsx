import React, {useState} from 'react'
import styled from 'styled-components'
import {Book} from '../types'
import {take} from 'lodash'
import Cover from './Cover'

export default function BookThumbnail({
  book,
  onClick
}: {
  book: Book
  onClick: (book: Book) => void
}) {
  const {title, color, genres} = book
  const [hovering, setHovering] = useState<boolean>(false)

  return (
    <LinkContainer
      title={title}
      onClick={() => onClick(book)}
      backgroundColor={color}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Title shouldShow={hovering}>{title}</Title>
      <Cover book={book} />
      <Info shouldShow={hovering}>
        {take(genres, 3).map((genre, index) => (
          <GenreTag key={index}>{genre}</GenreTag>
        ))}
      </Info>
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
const Title = styled.h2<{
  shouldShow: boolean
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 268px;
  margin: 0;
  padding: 16px;
  font-size: 20px;
  display: ${({shouldShow}) => (shouldShow ? 'flex' : 'none')};
  justify-content: space-between;
  align-items: center;
  background-color: #3e3e3b;
  color: #eee;
`

const Info = styled.div<{
  shouldShow: boolean
}>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 268px;
  margin: 0;
  padding: 16px;
  font-size: 16px;
  display: ${({shouldShow}) => (shouldShow ? 'flex' : 'none')};
  justify-content: center;
  flex-direction: row-reverse;
  flex-wrap: wrap;
`

const GenreTag = styled.div`
  background-color: #444444;
  color: #eee;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  margin-bottom: 8px;
  padding: 4px 8px;
`
