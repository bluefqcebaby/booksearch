import { FC } from "react"
import s from "./Loader.module.scss"

export const Loader: FC<{ visible: boolean }> = ({visible}) => {
  return (
    <div style={{ visibility: visible ? "visible" : "hidden" }} className={s.Loader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
