import s from "./SelectInput.module.scss"
import { FC, useState, MouseEvent, useRef, useEffect } from "react"
import { MdArrowForwardIos } from "react-icons/md"
import { useClickOutside } from "../../../utils/useClickOutside"
import { useTypedDispatch, useTypedSelector } from "../../../store/store"
import { CONSTANTS } from "../../../utils/constants"
import { selectChanged } from "../../../store/slices/booksSlice"

const baseClass = `${s.select__input__options}`
const openClass = `${s.select__input__options__open}`

export const SelectInput: FC<{ title?: string; options: string[]; type: string }> = ({
  title = "Выберите опцию",
  options,
  type,
}) => {
  const [selectInputClasses, setSelectInputClasses] = useState(baseClass)
  const { filter, sort } = useTypedSelector(state => state.books)
  const dispatcher = useTypedDispatch()
  const select = type === CONSTANTS.filter ? filter : sort
  //закрытие селекта при клике за пределы элемента
  const optionsBlock = useClickOutside(() => {
    setSelectInputClasses(baseClass)
  })

  const optionsClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    const elem = e.target as HTMLDivElement

    //проерка на то, чтобы ивент тригерился только при клике на нужный блок
    //если кликнуть точно на текст то текст соответственно заносится в elem
    //а у текста нет нужного ID, поэтому идет доп проверка на родительский блок
    if (elem.id === "options" || elem.parentElement?.id === "options") {
      setSelectInputClasses(prev => {
        return prev.includes(openClass) ? `${baseClass}` : `${prev} ${openClass}`
      })
    }
  }

  const selectionChanged = (value: string) => {
    dispatcher(selectChanged({ type, value }))
    setSelectInputClasses(baseClass)
  }
  return (
    <div className={s.select__input}>
      <h2 className={s.select__input__title}>{title}</h2>
      <div
        id='options'
        className={s.select__input__block}
        onClick={optionsClickHandler}
        ref={optionsBlock}
      >
        <p className={s.select__input__chosen}>{select}</p>
        <ul className={selectInputClasses}>
          {options.map(elem => (
            <li
              key={elem}
              className={`${s.select__input__option} ${
                select === elem && s.select__input__option__checked
              }`}
              onClick={() => selectionChanged(elem)}
            >
              {elem}
            </li>
          ))}
        </ul>
        <MdArrowForwardIos className={s.select__input__icon} />
      </div>
    </div>
  )
}
