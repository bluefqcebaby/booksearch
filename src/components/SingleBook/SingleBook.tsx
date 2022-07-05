import parse from "html-react-parser"
import { useEffect, useState } from "react"
import { IoArrowBackSharp } from "react-icons/io5"
import { useNavigate, useParams } from "react-router-dom"
import bookImg from "../../img/bookCover.jpg"
import { getSingleBook } from "../../store/slices/bookPageSlice"
import { booksReducer } from "../../store/slices/booksSlice"
import { useTypedDispatch, useTypedSelector } from "../../store/store"
import { format } from "../../utils/formatAuthors"
import { Loader } from "../Common/Loader/Loader"
import s from "./SingleBook.module.scss"

export const SingleBook = () => {
  const { book } = useTypedSelector(state => state.bookPage)
  const [error, setError] = useState("")
  const dispatcher = useTypedDispatch()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    ;(async () => {
      await dispatcher(getSingleBook(id!))
        .unwrap()
        .catch(err => setError(err))

      setLoading(false)
    })()
  }, [])
  const redirect = useNavigate()
  return (
    <article className={s.singleBook}>
      <div className='container'>
        <div className={s.singleBook__wrapper}>
          {loading ? (
            <Loader visible={loading} color='green' />
          ) : (
            <>
              {error ? (
                <h1 style={{ color: "red" }}>{error}</h1>
              ) : (
                <>
                  <figure className={s.singleBook__img__block}>
                    <img
                      src={book.volumeInfo?.imageLinks?.thumbnail ?? bookImg}
                      alt='book'
                    />
                  </figure>
                  <div className={s.singleBook__info}>
                    <p className={s.singleBook__categories}>
                      {format.stringsArr(book.volumeInfo.authors, "authors")}
                    </p>
                    <h2 className={s.singleBook__title}>{book.volumeInfo.title}</h2>
                    <p className={s.singleBook__author}>
                      {format.stringsArr(book.volumeInfo.categories, "categories")}
                    </p>
                    <p className={s.singleBook__description}>
                      {book.volumeInfo.description === undefined
                        ? "Description of the book not found😥"
                        : parse(book.volumeInfo.description)}
                    </p>
                  </div>
                </>
              )}
              <button className={s.singleBook__back} onClick={() => redirect(-1)}>
                <IoArrowBackSharp /> Back to the list
              </button>{" "}
            </>
          )}
        </div>
      </div>
      )
    </article>
  )
}
