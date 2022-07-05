import { FC } from "react"
import { IoColorFill } from "react-icons/io5"
import s from "./Loader.module.scss"

export const Loader: FC<{ visible: boolean; color: "white" | "green" }> = ({
  visible,
  color,
}) => {
  const divColor = {
    background: color,
  }
  return (
    <div style={{ visibility: visible ? "visible" : "hidden" }} className={s.Loader}>
      <div style={divColor}></div>
      <div style={divColor}></div>
      <div style={divColor}></div>
      <div style={divColor}></div>
    </div>
  )
}
