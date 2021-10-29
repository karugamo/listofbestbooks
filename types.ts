export type Book = {
  image: string
  url: string
  title: string
  color: string
  rating: number
  numRatings: number
  published: number
} & BookDetails

export type BookDetails = {
  isbn10?: string
  genres?: string[]
  description?: string
  author?: string
}
