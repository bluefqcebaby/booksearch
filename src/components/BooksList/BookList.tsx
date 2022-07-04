import s from "./BookList.module.scss"
import { BookItem } from "./BookItem/BookItem"
import { useTypedDispatch, useTypedSelector } from "../../store/store"
import bookCover from "../../img/bookCover.jpg"
import { useRef, useState } from "react"
import { getBookList } from "../../store/slices/booksSlice"

// const daun = {
//   name: "Nikita",
//   power: 0,
//   mother: "whore"
// }

export const BookList = () => {
  const { booksItems: books, totalItems } = useTypedSelector(
    state => state.books.bookListData
  )
  const searchPressed = useTypedSelector(state => state.books.searchPressed)
  const loading = useTypedSelector(state => state.books.loading)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const dispatcher = useTypedDispatch()
  const startIndex = useRef(0)
  const loadMoreBooks = async () => {
    setBtnDisabled(true)
    await dispatcher(getBookList(startIndex.current))
    setBtnDisabled(false)
  }
  if (!searchPressed) {
    return (
      <section className={s.bookList}>
        <div className='container'>
          <h2 className={s.bookList__noBooks}>Books will be displayed here</h2>
        </div>
      </section>
    )
  } else {
    startIndex.current = books.length
    const bookItems = books.map(elem => (
      <BookItem
        key={elem.id}
        title={elem.volumeInfo.title}
        thumbnail={elem.volumeInfo?.imageLinks?.thumbnail ?? bookCover}
        authors={elem.volumeInfo.authors}
        categories={elem.volumeInfo.categories}
      />
    ))

    return (
      <section className={s.bookList}>
        <div className='container'>
          {!loading && (
            <h2 className={s.bookList__result}>
              Found <span style={{ fontWeight: "bold" }}>{totalItems}</span> results
            </h2>
          )}
          <div className={s.bookList__wrapper}>{bookItems}</div>
          {bookItems.length !== 0 && (
            <button
              className={s.bookList__load__more}
              onClick={loadMoreBooks}
              disabled={btnDisabled}
            >
              {btnDisabled ? "Loading..." : "Load more"}
            </button>
          )}
        </div>
      </section>
    )
  }
}
