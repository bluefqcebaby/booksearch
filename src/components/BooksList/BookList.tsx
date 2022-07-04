import s from "./BookList.module.scss"
import { BookItem } from "./BookItem/BookItem"
import { useTypedDispatch, useTypedSelector } from "../../store/store"
import bookCover from "../../img/bookCover.jpg"
import { useEffect, useRef, useState } from "react"
import { getBookList } from "../../store/slices/booksSlice"
import { CONSTANTS } from "../../utils/constants"

// const daun = {
//   name: "Nikita",
//   power: 0,
//   mother: "whore"
// }

export const BookList = () => {
  const { bookItems: books, totalItems } = useTypedSelector(
    state => state.books.bookListData
  )
  const searchPressed = useTypedSelector(state => state.books.searchPressed)
  const loading = useTypedSelector(state => state.books.loading)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const dispatcher = useTypedDispatch()
  const startIndex = useRef(0)
  const loadMoreBooks = async () => {
    setBtnDisabled(true)
    if (books.length + CONSTANTS.numberOfResults > totalItems) {
      const numOfRes = totalItems - books.length
      await dispatcher(
        getBookList({ startIndex: startIndex.current, numberOfResults: numOfRes })
      )
      return
    }
    await dispatcher(getBookList({ startIndex: startIndex.current }))
    setBtnDisabled(false)
  }
  useEffect(() => {
    console.log(books.length)
    if (books.length >= totalItems && books.length !== 0) {
      setBtnDisabled(true)
    } else {
      setBtnDisabled(false)
    }
  }, [books])
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
        key={elem.etag}
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
              {loading
                ? "Loading..."
                : btnDisabled
                ? "Thats all books i have😭"
                : "Load more"}
            </button>
          )}
        </div>
      </section>
    )
  }
}
