import { useEffect, useRef } from "react"

export function useClickOutside(handler: () => void) {
  const ref = useRef<any>() // тип any чтобы у рефа было свойство contains
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      //доп проверка чтобы TS не ругался на то что реф может быть undefined
      if (ref.current && !ref.current.contains(event?.target as HTMLElement)) {
        handler()
      }
    }
    document.addEventListener("mousedown", listener)
    return () => {
      document.removeEventListener("mousedown", listener)
    }
  }, [])
  return ref
}
