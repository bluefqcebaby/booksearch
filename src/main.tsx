import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { App } from "./App"
import "./index.scss"
import { store } from "./store/store"
import { BrowserRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename='/booksearch'>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>
)
