import { useState, useEffect } from "react";
import axios from "axios";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";

function App() {
  const [books, setBooks] = useState([]);
  // when we use arrays we should never use .push to it because React is not going to rerender since the old and new value points to the same reference
  // instead we would like to create a new array, copy all the elements from the old array and add new elements to the new array.This way it will be rerendered

  const fetchBooks = async () => {
    // we need to make sure that this function is called only once. For this purpose we will look at useEffect
    const response = await axios.get("http://localhost:3001/books");

    setBooks(response.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);
  // func passed yo useEffect always gets called immediatly after first render, it might be called on the following renders, depending on the second argument(the one in [])

  const deleteBookById = async (id) => {
    await axios.delete("http://localhost:3001/books/" + id);

    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  };

  const editBookById = async (id, newTitle) => {
    const response = await axios.put("http://localhost:3001/books/" + id, {
      title: newTitle,
    });

    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data }; // ...response.data take all of the different properties and add them to this new object
      }

      return book;
    });

    setBooks(updatedBooks);
  };

  const createBook = async (title) => {
    const response = await axios.post("http://localhost:3001/books", {
      title,
    });

    const updatedBooks = [...books, response.data];

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
