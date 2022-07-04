import { useEffect, useState } from "react"
import { useTypedSelector } from "../../../store/store"
import s from "./ErrorAlert.module.scss"

export const ErrorAlert = () => {
  const [errorClasses, setErrorClasses] = useState(`${s.error}`)
  const error = useTypedSelector(state => state.books.error)
  useEffect(() => {
    setErrorClasses(`${s.error}`)
    if (error === "") return
    setErrorClasses(prev => `${prev} ${s.error__enter}`)
    const timeoutId = setTimeout(() => {
      setErrorClasses(prev => `${prev} ${s.error__exit}`)
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [error])
  return <div className={errorClasses}>{error}</div>
}
