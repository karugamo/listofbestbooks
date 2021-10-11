import React from 'react'
import styled from 'styled-components'
import {Book} from '../types'

export default function BookThumbnail({image, title, color, isbn10}: Book) {
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
    >
      <Cover src={src} alt={title} />
    </LinkContainer>
  )
}

const LinkContainer = styled.a<{
  backgroundColor: string
}>`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${({backgroundColor}) => backgroundColor};
`

const Cover = styled.img.attrs({width: 300, loading: 'lazy'})`
  width: 300px;
`
