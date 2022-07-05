export interface Book {
  id: string
  etag: string
  selfLink: string
  volumeInfo: BookInfo
}
interface BookInfo {
  title: string
  authors: string[]
  description: string
  categories: string[]
  imageLinks?: imgLinks
  language: string
}
interface imgLinks {
  smallThumbnail: string
  thumbnail: string
  extraLarge: string
}
