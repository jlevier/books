import { Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useContext } from 'react';
import { BookContext, BookContextType } from '../contexts/BookContext';
import { Book } from '../types/Book';

export const Search = () => {
  const { books, setFilteredBooks } = useContext(BookContext) as BookContextType;

  const onTextChange = (text: string) => {
    setFilteredBooks(
      books ? books.books.filter(x => x.title.toLowerCase().indexOf(text) > -1) : new Array<Book>()
    );
  }
  
  return (
    <Input 
      icon={<IconSearch />} 
      placeholder="Search"
      size="md"
      radius="md"
      onChange={e => onTextChange(e.target.value)}
      width="450px"
    />
  );
}