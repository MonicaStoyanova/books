import { useState } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";

function App() {
  const [books, setBooks] = useState([]);
  // when we use arrays we should never use .push to it because React is not going to rerender since the old and new value points to the same reference
  // instead we would like to create a new array, copy all the elements from the old array and add new elements to the new array.This way it will be rerendered

  const deleteBookById = (id) => {
    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  };

  const editBookById = (id, newTitle) => {
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, title: newTitle };
      }

      return book;
    });

    setBooks(updatedBooks);
  };

  const createBook = (title) => {
    // event handler for book creation
    const updatedBooks = [
      ...books,
      { id: Math.round(Math.random() * 9999), title }, // since our app is small we will use Math.random, even it is rare it is possible to generate two identical ids
    ];

    setBooks(updatedBooks);
  };

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList onEdit={editBookById} books={books} onDelete={deleteBookById} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
