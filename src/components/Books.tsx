import { LoadingOverlay } from "@mantine/core";
import { CSSProperties, useContext, useEffect, useState } from "react";
import { BookContext, BookContextType } from "../contexts/BookContext";
import { getBooks } from "../services/Books";
import { Details } from "./Details";
import { Grid } from "./Grid";
import { Header } from "./Header";
import { List } from "./List";

export const Books = () => {
  const [view, setView] = useState<boolean>(false);
  const [loadList, setLoadList] = useState<boolean>(false);
  const { books, setBooks, setFilteredBooks } = useContext(BookContext) as BookContextType;

  const getTransitionStyle = (isCurrent: boolean): CSSProperties => {
    return {
      opacity: isCurrent ? '1' : '0',
      transition: 'all .2s',
      height: isCurrent ? '100%' : '0',
    }
  };

  const viewChange = (isList: boolean) => {
    if (isList) {
      setLoadList(true);
    }
    setView(isList);
  }

  useEffect(() => {
    getBooks().then((books) => {
      setBooks(books);
      setFilteredBooks(books.books);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Header onViewChange={viewChange} />
      <div>
        <LoadingOverlay
          visible={books === undefined}
          overlayBlur={2}
          pos="relative"
          h="100vh"
          loaderProps={{
            variant: 'dots',
            size: 'xl'
          }}
        />
        {books && <Grid style={getTransitionStyle(!view)} /> }
        {books && loadList && <List style={getTransitionStyle(view)} /> }
      </div>
      <Details />
    </>
  );
}