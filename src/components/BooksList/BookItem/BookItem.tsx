import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { format } from "../../../utils/formatAuthors"
import s from "./BookItem.module.scss"

export const BookItem: FC<{
  id: string
  thumbnail?: string
  categories?: string[]
  title: string
  authors?: string[]
}> = ({ thumbnail, categories, title, authors, id }) => {
  let category = ""
  if (categories !== undefined) {
    category = categories[0]
  }
  const formattedAuthors = format.stringsArr(authors, "authors")
  const navigate = useNavigate()
  return (
    <article className={s.book} onClick={() => navigate(`/${id}`)}>
      <figure className={s.book__img__wrapper}>
        <img src={thumbnail} alt='book-image' className={s.book__img} />
      </figure>
      <p className={s.book__category}>{category}</p>
      <h2 className={s.book__name}>{title}</h2>
      <p className={s.book__author}>{formattedAuthors}</p>
    </article>
  )
}
