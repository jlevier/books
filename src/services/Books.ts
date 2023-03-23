import axios from 'axios';
import { Books } from '../types/Book';

export const getBooks = async (): Promise<Books> => {
  const books = await axios.get('/books', {
    baseURL: 'https://riabooksapi.azurewebsites.net'
  });

  return books.data;
}