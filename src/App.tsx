import { BookList } from "./components/BooksList/BookList"
import { ErrorAlert } from "./components/Common/ErrorAlert/ErrorAlert"
import { Search } from "./components/Search/Search"
import { SingleBook } from "./components/SingleBook/SingleBook"

export const App = () => {
  return (
    <>
      <Search />
      <BookList />
      <ErrorAlert />
    </>
  )
}
