import React from 'react'
import Modal from './Modal'
import {Book} from '../types'
import Cover from './Cover'
import styled from 'styled-components'
import {uniq} from 'lodash'

export default function BookModal({book, onClose}: {book: Book; onClose: any}) {
  return (
    <Modal isOpen={Boolean(book)} onClose={onClose}>
      <ModalContent>
        <StyledCover book={book} />
        <BookInfo>
          <Title>
            {book.title.replace(/\(.*\)/g, '')} ({book.published})
          </Title>
          <Author>{book.author}</Author>
          <Rating>★ {book.rating}</Rating>
          <Description>{book.description}</Description>
          <Genres>{uniq(book.genres).join(' · ')}</Genres>
          <Spacer />
          <Links>
            <Link href={getAmazonLink(book)} target="_blank" rel="noreferrer">
              Amazon
            </Link>
            <Link
              href={`https://goodreads.com${book.url}`}
              target="_blank"
              rel="noreferrer"
            >
              GoodReads
            </Link>
          </Links>
        </BookInfo>
        <Close onClick={onClose}>╳</Close>
      </ModalContent>
    </Modal>
  )
}

function getAmazonLink({isbn10, title}: Book) {
  return isbn10
    ? `https://www.amazon.com/gp/product/${isbn10}?tag=karugamo-20`
    : `https://www.amazon.de/s?k=${encodeURI(
        title
      )}&i=stripbooks&tag=karugamo-20`
}

const StyledCover = styled(Cover)`
  @media (max-width: 768px) {
    display: none;
  }
`

const Close = styled.div`
  font-size: 40px;
  margin-top: -8px;
  cursor: pointer;
  height: 55px;
  @media (max-width: 768px) {
    align-self: flex-end;
  }
`

const Rating = styled.div`
  font-size: 1.2rem;
`

const Description = styled.div``

const Genres = styled.div`
  opacity: 0.8;
`

const Link = styled.a`
  color: #1a191d;
  font-size: 1.2rem;
  border: 1px solid #1a191d;
  border-radius: 8px;
  padding: 8px 24px;
  text-decoration: none;
`

const ModalContent = styled.div`
  display: flex;
  gap: 32px;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 0;
  }
  color: #1a191d;
  margin: 24px 32px;
`

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Title = styled.h2`
  margin-top: 4px;
  font-size: 1.5rem;
  margin-bottom: -8px;
`

const Author = styled.div`
  opacity: 0.8;
`

const Links = styled.div`
  display: flex;
  margin-bottom: 8px;
  gap: 8px;
`

const Spacer = styled.div`
  flex: 1;
`
