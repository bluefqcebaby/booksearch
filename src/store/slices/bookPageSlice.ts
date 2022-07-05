import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { Book } from "../../models/book"
import { BooksAPI } from "../../request/requests"

interface booksInterface {
  book: Book
}

const initialState: booksInterface = {
  book: <Book>{},
}

export const getSingleBook = createAsyncThunk(
  "bookPage/getSingleBook",
  async (action: string, { rejectWithValue }) => {
    try {
      const result = await BooksAPI.getSingleBook(action)
      return result.data
    } catch (err) {
      const error = err as AxiosError
      if (error.response?.status === 503) return rejectWithValue("Cant find this book")
      return rejectWithValue(`${error.message}`)
    }
  }
)

const bookPageSlice = createSlice({
  name: "bookPage",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSingleBook.fulfilled, (state, action) => {
      state.book = action.payload
    })
  },
})

export const bookPageReducer = bookPageSlice.reducer
