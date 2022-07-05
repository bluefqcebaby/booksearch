import { Book } from "../models/book"
import { CONSTANTS } from "../utils/constants"
import { BookResponse } from "./../models/booksList"
import { bookListRequest, singleBookRequest } from "./instances"

export const BooksAPI = {
  getBooks(
    search: string,
    startIndex: number,
    sort: string,
    filter: string,
    numberOfResults: number = CONSTANTS.numberOfResults
  ) {
    const filterText = filter === "all" ? "" : `+subject:${filter}`
    return bookListRequest.get<BookResponse>(
      `/?q=${search}${filterText}&startIndex=${startIndex}&maxResults=${numberOfResults}&orderBy=${sort}`
    )
  },
  getSingleBook(id: string) {
    return singleBookRequest.get<Book>(`/${id}`)
  },
}
