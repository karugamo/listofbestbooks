import React from 'react'
import styled from 'styled-components'
import {Book} from '../types'

export default function BookThumbnail({image, title, url}: Book) {
  const src = image
    .replace('._SY75_', '')
    .replace('._SX50_', '')
    .replace('SY75_', '')
  return (
    <a
      title={title}
      target="_blank"
      rel="noreferrer"
      href={'https://goodreads.com/' + url}
    >
      <Cover src={src} alt={title} />
    </a>
  )
}

const Cover = styled.img.attrs({width: 300, loading: 'lazy'})`
  width: 300px;
`
