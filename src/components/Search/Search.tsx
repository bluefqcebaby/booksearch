import s from "./Search.module.scss"
import { BsSearch } from "react-icons/bs"
import { ImBook } from "react-icons/im"
import { ChangeEvent, FormEvent } from "react"
import { SelectInput } from "../Common/SelectInput/SelectInput"
import { CONSTANTS } from "../../utils/constants"
import { useTypedDispatch, useTypedSelector } from "../../store/store"
import { getBookList, clearBooks, searchTextChanged } from "../../store/slices/booksSlice"
import { Loader } from "../Common/Loader/Loader"

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
  const loading = useTypedSelector(state => state.books.loading)
  const { searchText } = useTypedSelector(state => state.books.form)
  const dispatcher = useTypedDispatch()

  const getBooks = async (e: FormEvent) => {
    e.preventDefault()
    dispatcher(clearBooks())
    await dispatcher(getBookList({ startIndex: 0 }))
      .unwrap()
      .catch(err => console.log(err))
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
          <form className={s.search__form} onSubmit={getBooks}>
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
            <Loader visible={loading} />
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
