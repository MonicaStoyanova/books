import "./index.css";
import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import { Provider } from "./context/books";

const el = document.getElementById("root");
const root = ReactDom.createRoot(el);

root.render(
  // given by React
  // whatever value we give the provider is the value that gets shared to other components
  // when the value changes we would like to rerender which means we are going to need state
  // we will put refence to a piece of state and a function in object, so that the function can change the piece of state
  //<BooksContext.Provider value={{ count, incrementCount }}>
  // <App />
  //</BooksContext.Provider>

  <Provider>
    <App />
  </Provider>
);
