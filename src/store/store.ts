import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { bookReducer } from "./slices/bookPageSlice"
import { booksReducer } from "./slices/booksSlice"

export const store = configureStore({
  reducer: {
    book: bookReducer,
    books: booksReducer,
  },
})

type AppDispatch = typeof store.dispatch

export const useTypedDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof store.getState>

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
