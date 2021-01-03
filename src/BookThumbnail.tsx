import React from 'react'
import styled from 'styled-components'
import {Book} from '../types'

export default function BookThumbnail({image, title, onClick, isbn10}: any) {
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
    <a title={title} target="_blank" rel="noreferrer" href={href}>
      <Cover
        src={src}
        alt={title}
        crossOrigin="anonymous"
        onMouseEnter={click}
      />
    </a>
  )

  function click(event: React.SyntheticEvent) {
    onClick(event.target, title)
  }
}

const Cover = styled.img.attrs({width: 300, loading: 'lazy'})`
  width: 300px;
`
