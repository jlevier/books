import React, { createContext, FC, useState } from "react";
import { Book, Books } from "../types/Book";

export type BookContextType = {
  books: Books | undefined;
  setBooks: (books: Books) => void;
  selectedBook: Book | undefined;
  setSelectedBook: (book: Book | undefined) => void;
  filteredBooks: Array<Book> | undefined;
  setFilteredBooks: (books: Array<Book>) => void;
};

export const BookContext = createContext<BookContextType | null>(null);

type Props = {
  children?: React.ReactNode
};

const BookProvider: FC<Props> = ({ children }) => {
  const [books, setBooks] = useState<Books | undefined>();
  const [selectedBook, setSelectedBook] = useState<Book>();
  const [filteredBooks, setFilteredBooks] = useState<Array<Book> | undefined>();

  return (
  <BookContext.Provider value={{
      books,
      setBooks,
      selectedBook,
      setSelectedBook,
      filteredBooks,
      setFilteredBooks,
    }}>
    {children}
  </BookContext.Provider>
  );
}

export default BookProvider;