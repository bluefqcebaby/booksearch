import { BookList } from "./components/BooksList/BookList"
import { ErrorAlert } from "./components/Common/ErrorAlert/ErrorAlert"
import { Search } from "./components/Search/Search"
import { SingleBook } from "./components/SingleBook/SingleBook"
import { Routes, Route } from "react-router-dom"

export const App = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <>
            <Search />
            <BookList />
            <ErrorAlert />
          </>
        }
      />
      <Route path='/:id' element={<SingleBook />} />
    </Routes>
  )
}
