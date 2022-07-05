import s from "./SingleBook.module.scss"
import { IoArrowBackSharp } from "react-icons/io5"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Loader } from "../Common/Loader/Loader"
import { useTypedDispatch, useTypedSelector } from "../../store/store"
import { format } from "../../utils/formatAuthors"
import bookImg from "../../img/bookCover.jpg"
import { getSingleBook } from "../../store/slices/bookPageSlice"
import parse from "html-react-parser"

export const SingleBook = () => {
  const { book } = useTypedSelector(state => state.book)
  const dispatcher = useTypedDispatch()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const redirect = useNavigate()
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      await dispatcher(getSingleBook(id!))
        .unwrap()
        .catch(err => console.log(err))
      setLoading(false)
    })()
  }, [])
  return (
    <article className={s.singleBook}>
      <div className='container'>
        <div className={s.singleBook__wrapper}>
          {loading ? (
            <Loader visible={loading} color='green' />
          ) : (
            <>
              <figure className={s.singleBook__img__block}>
                <img src={book.volumeInfo.imageLinks?.thumbnail ?? bookImg} alt='book' />
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
              <button className={s.singleBook__back} onClick={() => redirect("/")}>
                <IoArrowBackSharp /> Back to the list
              </button>
            </>
          )}
        </div>
      </div>
      )
    </article>
  )
}
