import { Image, Text, Tooltip, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { CSSProperties, useContext } from "react";
import { BookContext, BookContextType } from "../contexts/BookContext";
import { Book } from "../types/Book";
import { formatDate } from "../utils/Dates";

const gridClass = 'grid grid-cols-10 gap-4 px-1 pb-1 pt-5 border-b dark:border-b-gray-700 sticky z-50 bg-white';
const gridClassDetails = 'grid grid-cols-10 gap-4 p-1 bg-slate-50 dark:bg-stone-900 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 border-b dark:border-b-gray-700';

const Header = (props: {text: string}) => {
  return (
    <Text
      className='font-bold dark:text-sky-200'
      sx={(theme) => ({
        fontFamily: theme.headings.fontFamily,
      })}
    >
      {props.text}
    </Text>
  );
}

const Headers = () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  
  return (
    <div
      className={gridClass}
      style={{ 
        top: '62px',
        backgroundColor: colorScheme === 'dark' ? theme.colors.dark[7] : '#fff',
      }}
    >
      <Header text="" />
      <Header text="Title" />
      <Header text="ISBN" />
      <Header text="Short Desc." />
      <Header text="Long Desc." />
      <Header text="Status" />
      <Header text="Authors" />
      <Header text="Categories" />
      <Header text="Pages" />
      <Header text="Publish Date" />
    </div>
  );
};

const WrapTooltip = ({text}: {text: string}) => {
  return (
    text
      ? <Tooltip label={text} multiline w={'25%'}>
          <div className="truncate ...">
            {text}
          </div>
        </Tooltip>
      : <div></div>
  );
};

interface DetailsProps {
  books: Array<Book>;
};

const Details = ({ books }: DetailsProps) => {
  const { setSelectedBook } = useContext(BookContext) as BookContextType;

  return (
    <>
      {books.map(book => (
        <div className={gridClassDetails} key={book.title} onClick={_e => setSelectedBook(book)}>
          <div>
            <Image
              radius="md"
              src={book.thumbnailURL}
              alt={book.title}
              withPlaceholder
              width={'100px'}
            />
          </div>
          <div>{book.title}</div>
          <div>{book.isbn}</div>
          <WrapTooltip text={book.shortDescription} />
          <WrapTooltip text={book.longDescription} />
          <div>{book.status}</div>
          <div>{book.authors}</div>
          <div>{book.categories}</div>
          <div>{book.pageCount}</div>
          <div>{formatDate(new Date(book.publishDate))}</div>
        </div>
      ))}
    </>
  )
};


export type GridProps = {
  style: CSSProperties;
};

export const Grid = ({ style }: GridProps) => {
  const { filteredBooks: books } = useContext(BookContext) as BookContextType;

  return books?.length ? (
    <div className="px-4" style={style}>
      <Headers />
      <Details books={books} />
    </div>
  ) : null;
};