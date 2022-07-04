import { RootState, store } from "./../store"
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { BookResponse } from "../../models/booksList"
import { CONSTANTS } from "../../utils/constants"
import { _ActionCreatorWithPreparedPayload } from "@reduxjs/toolkit/dist/createAction"
import { BooksAPI } from "../../request/requests"
import { Book } from "../../models/book"

interface booksInterface {
  bookListData: {
    totalItems: number
    bookItems: Book[]
  }
  searchPressed: boolean
  loading: boolean
  error: string
  form: {
    searchText: string
    sort: string
    filter: string
  }
}

const initialState: booksInterface = {
  form: {
    searchText: "",
    sort: "relevance",
    filter: "all",
  },
  error: "",
  loading: false,
  bookListData: {
    bookItems: [],
    totalItems: 0,
  },
  searchPressed: false,
}

interface selectChangedPayload {
  type: string
  value: string
}

export const getBookList = createAsyncThunk<
  BookResponse,
  { startIndex: number; numberOfResults?: number },
  { state: RootState; rejectValue: string }
>("books/getBookList", async (action, { rejectWithValue, getState }) => {
  try {
    const state = getState()
    const { searchText, sort, filter } = state.books.form
    const result = await BooksAPI.getBooks(
      searchText,
      action.startIndex,
      sort,
      filter,
      action.numberOfResults
    )
    console.log(result.data)
    return result.data
  } catch (err) {
    const error = err as AxiosError
    return rejectWithValue(error.message)
  }
})

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    selectChanged: (state, action: PayloadAction<selectChangedPayload>) => {
      const { value, type } = action.payload
      if (type === CONSTANTS.sort) {
        state.form.sort = value
      } else if (type === CONSTANTS.filter) {
        state.form.filter = value
      }
    },
    searchTextChanged: (state, action: PayloadAction<string>) => {
      state.form.searchText = action.payload
    },
    clearBooks: state => {
      state.bookListData.bookItems = []
    },
  },
  extraReducers: builder => {
    builder.addCase(getBookList.pending, state => {
      state.loading = true
      state.error = ""
    })
    builder.addCase(getBookList.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload!
      state.searchPressed = false // Чтобы появился опять начальный экран
    })
    builder.addCase(getBookList.fulfilled, (state, action) => {
      state.loading = false
      state.error = ""
      const { items, totalItems } = action.payload
      if (items === undefined) {
        state.searchPressed = true
        state.bookListData.bookItems = []
        state.bookListData.totalItems = 0
        return
      }
      if (state.bookListData.bookItems.length !== 0) {
        items.forEach(elem => {
          state.bookListData.bookItems.push(elem)
        })
      } else {
        state.searchPressed = true
        state.bookListData.bookItems = items
        state.bookListData.totalItems = totalItems
      }
    })
  },
})

export const booksReducer = booksSlice.reducer

export const { selectChanged, searchTextChanged, clearBooks } = booksSlice.actions
