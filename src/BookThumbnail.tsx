import React from 'react'
import styled from 'styled-components'
import {Book} from '../types'

export default function BookThumbnail({image}: Book) {
  const src = image.replace('._SY75_', '').replace('._SX50_', '')
  return <Cover src={src} />
}

const Cover = styled.img`
  width: 300px;
`
