import React, {useState} from 'react'
import styled from 'styled-components'
import {Book} from '../types'
import {take} from 'lodash'

export default function BookThumbnail({
  image,
  title,
  color,
  isbn10,
  genres
}: Book) {
  const [hovering, setHovering] = useState<boolean>(false)

  const src = image
    .replace('._SY75_', '')
    .replace('._SX50_', '')
    .replace('SY75_', '')
  const href = isbn10
    ? `https://www.amazon.com/gp/product/${isbn10}?tag=karugamo-20`
    : `https://www.amazon.de/s?k=${encodeURI(
        title
      )}&i=stripbooks&tag=karugamo-20`
  return (
    <LinkContainer
      title={title}
      target="_blank"
      rel="noreferrer"
      href={href}
      backgroundColor={color}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Title shouldShow={hovering}>{title}</Title>
      <Cover src={src} alt={title} />
      <Info shouldShow={hovering}>
        {take(genres, 3).map((genre, index) => (
          <GenreTag key={index}>{genre}</GenreTag>
        ))}
      </Info>
    </LinkContainer>
  )
}

const LinkContainer = styled.a<{
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

  @media (max-width: 444px) {
    width: 100%;
  }

  @media (min-width: 520px) {
    transition: transform 0.1s ease-in-out;

    :hover {
      transform: scale(1.1);
      z-index: 10;
    }
  }
`
const Title = styled.h2<{
  shouldShow: boolean
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 268;
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
  width: 268;
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

const Cover = styled.img.attrs({width: 300, loading: 'lazy'})`
  width: 300px;
  border-radius: 2px 8px 8px 2px;
`
