import { BookList } from "./components/BooksList/BookList"
import { Search } from "./components/Search/Search"
import { SingleBook } from "./components/SingleBook/SingleBook"

export const App = () => {
  return (
    <>
      <Search />
      <BookList />
    </>
  )
}
