export type Book = {
  image: string
  url: string
  title: string
  color: string
} & BookDetails

export type BookDetails = {
  isbn10?: string
  genres?: string[]
}
