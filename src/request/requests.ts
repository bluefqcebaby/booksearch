import { BookResponse } from "./../models/booksList"
import { bookListRequest } from "./instances"

export const BooksAPI = {
  getBooks(
    search: string,
    startIndex: number,
    sort: string,
    filter: string,
    numberOfResults: number = 30
  ) {
    const filterText = filter === "all" ? "" : `+subject:${filter}`
    return bookListRequest.get<BookResponse>(
      `/?q=${search}${filterText}&startIndex=${startIndex}&maxResults=${numberOfResults}&orderBy=${sort}`
    )
  },
}
