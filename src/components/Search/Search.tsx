import s from "./Search.module.scss"
import { BsSearch } from "react-icons/bs"
import { ImBook } from "react-icons/im"
import { ChangeEvent, FormEvent, useState } from "react"
import { SelectInput } from "../Common/SelectInput/SelectInput"
import { CONSTANTS } from "../../utils/constants"
import { useTypedDispatch, useTypedSelector } from "../../store/store"
import { searchTextChanged } from "../../store/slices/booksSlice"

const CATEGORIES = [
  "all",
  "art",
  "biography",
  "computers",
  "history",
  "medical",
  "poetry",
]
const SORT = ["relevance", "newest"]
export const Search = () => {
  const { searchText } = useTypedSelector(state => state.books)
  const dispatcher = useTypedDispatch()
  
  const getBooks = (e: FormEvent) => {
    e.preventDefault()
    console.log("letsgo")
  }

  const searchTyping = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    dispatcher(searchTextChanged(value))
  }
  return (
    <section className={s.search}>
      <div className='container'>
        <div className={s.search__wrapper}>
          <h1 className={s.search__title}>Book search</h1>
          <form className={s.search__form} onSubmit={e => getBooks(e)}>
            <div className={s.search__form__input_wrapper}>
              <ImBook className={s.search__form__book_icon} />
              <input
                className={s.search__form__input}
                type='text'
                placeholder='Search for books...'
                value={searchText}
                onChange={searchTyping}
              />
              <button className={s.search__form__button}>
                <BsSearch color='white' />
              </button>
            </div>
            <div className={s.search__form__options}>
              {/** я решил использовать кастомные селекты потому что обычные */}
              {/** нельзя стилизовать, заодно решил показать, что могу такое делать :) */}
              <SelectInput
                title='Categories'
                options={CATEGORIES}
                type={CONSTANTS.filter}
              />
              <SelectInput title='Sorting by' options={SORT} type={CONSTANTS.sort} />
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
