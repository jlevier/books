export interface Book {
  title: string;
  isbn: string;
  thumbnailURL: string;
  shortDescription: string;
  longDescription: string;
  status: string;
  authors: Array<string>;
  categories: Array<string>;
  pageCount: number;
  publishDate: Date;
};

export interface Books {
  books: Array<Book>;
  count: number;
}