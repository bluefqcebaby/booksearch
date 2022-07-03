import s from "./BookList.module.scss"
import { BookItem } from "./BookItem/BookItem"

export const BookList = () => {
  return (
    <section className={s.bookList}>
      <div className='container'>
        <h2 className={s.bookList__result}>
          Found <span style={{ fontWeight: "bold" }}>512</span> results
        </h2>
        <div className={s.bookList__wrapper}>
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
        </div>
        <button className={s.bookList__load__more}>Load more...</button>
      </div>
    </section>
  )
}
