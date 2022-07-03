import { createAsyncThunk, current, PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"
import { BookList } from "../../models/booksList"
import { CONSTANTS } from "../../utils/constants"

interface stateInterface {
  books: BookList[]
  searchText: string
  sort: string
  filter: string
}

const initialState: stateInterface = {
  books: [],
  searchText: "",
  sort: "relevance",
  filter: "all",
}

interface selectChangedPayload {
  type: string
  value: string
}

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    selectChanged: (state, action: PayloadAction<selectChangedPayload>) => {
      const { value, type } = action.payload
      if (type === CONSTANTS.sort) {
        state.sort = value
      } else if (type === CONSTANTS.filter) {
        state.filter = value
      }
    },
    searchTextChanged: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload
    }
  },
  extraReducers: builder => {},
})

export const booksReducer = booksSlice.reducer

export const { selectChanged, searchTextChanged } = booksSlice.actions
