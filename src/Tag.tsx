import styled from 'styled-components'

type TagProps = {
  inverted?: boolean
}

const Tag = styled.div<TagProps>`
  border-radius: 25px;
  text-align: center;
  padding: 4px 10px;
  margin-left: 4px;
  background: ${({inverted}) => (inverted ? '#ddd' : 'transparent')};
  border: 2px solid ${({inverted}) => (inverted ? '#ccc' : '#ddd')};
  color: ${({inverted}) => (inverted ? '#333' : '#ddd')};
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  font-size: 20px;

  @media (max-width: 1200px) {
    flex-basis: 80%;
  }
`

export default Tag
