import { Book } from "./book"

export interface BookResponse {
  totalItems: number
  items?: Book[]
}
