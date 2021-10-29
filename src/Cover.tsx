import styled from 'styled-components'
import React from 'react'
import {Book} from '../types'

export default function Cover({book, ...props}: {book: Book}) {
  const {title, image} = book
  const src = image
    .replace('._SY75_', '')
    .replace('._SX50_', '')
    .replace('SY75_', '')

  return <Image src={src} alt={title} {...props} />
}

const Image = styled.img.attrs({width: 300, loading: 'lazy'})`
  object-fit: contain;
  object-position: left top;
  width: 300px;
  border-radius: 2px 8px 8px 2px;
`
