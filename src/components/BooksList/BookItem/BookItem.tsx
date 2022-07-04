import { FC } from "react"
import s from "./BookItem.module.scss"

export const BookItem: FC<{
  thumbnail?: string
  categories?: string[]
  title: string
  authors?: string[]
}> = ({ thumbnail, categories, title, authors }) => {
  let category = ""
  if (categories !== undefined) {
    category = categories[0]
  }
  const formattedAuthors = authors?.map((elem, index) => {
    if (authors.length === index + 1) {
      return elem
    }
    return `${elem}, `
  })
  return (
    <article className={s.book}>
      <figure className={s.book__img__wrapper}>
        <img src={thumbnail} alt='book-image' className={s.book__img} />
      </figure>
      <p className={s.book__category}>{category}</p>
      <h2 className={s.book__name}>{title}</h2>
      <p className={s.book__author}>{formattedAuthors}</p>
    </article>
  )
}
