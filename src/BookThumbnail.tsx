import React from 'react'
import styled from 'styled-components'
import {Book} from '../types'

export default function BookThumbnail({image}: Book) {
  const src = image
    .replace('._SY75_', '')
    .replace('._SX50_', '')
    .replace('SY75_', '')
  return <Cover src={src} />
}

const Cover = styled.img.attrs({width: 300, loading: 'lazy'})`
  width: 300px;
`
