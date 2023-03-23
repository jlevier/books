import { Card, Image, Group, Text, Badge, useMantineColorScheme, Slider, useMantineTheme } from "@mantine/core";
import { CSSProperties, useContext, useState } from "react";
import { BookContext, BookContextType } from "../contexts/BookContext";

type ToggleProps = {
  setNumCols: (numCols: number) => void;
  style: CSSProperties;
}

const Toggle = ({ setNumCols, style } : ToggleProps) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  
  const MARKS: {
    value: number;
    label?: React.ReactNode;
  }[] = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
  ];

  return (
    <div
      className='grid place-items-center px-1 pb-5 pt-5 border-b dark:border-b-gray-700 sticky z-50 bg-white'
      style={{
        ...style,
        bottom: '0px',
        backgroundColor: colorScheme === 'dark' ? theme.colors.dark[7] : '#fff',
      }}
    >
      <Slider
        defaultValue={3}
        min={1}
        max={MARKS.sort((a, b) => a.value > b.value ? 1 : 0)[MARKS.length-1].value}
        step={1}
        marks={MARKS}
        w={'350px'}
        onChange={x => setNumCols(x)}
      />
    </div>
  );
}

export type ListProps = {
  style: CSSProperties;
};

export const List = ({ style }: ListProps) => {
  const { filteredBooks: books, setSelectedBook } = useContext(BookContext) as BookContextType;
  const { colorScheme } = useMantineColorScheme();
  const [numCols, setNumCols] = useState<number>(3);

  const gridClass = `gap-4 px-4 grid
                     ${numCols == 1 ? 'grid-cols-1' : ''}
                     ${numCols == 2 ? 'grid-cols-2' : ''}
                     ${numCols == 3 ? 'grid-cols-3' : ''}
                     ${numCols == 4 ? 'grid-cols-4' : ''}
                     ${numCols == 5 ? 'grid-cols-5' : ''}
                     ${numCols == 6 ? 'grid-cols-6' : ''}
                     ${numCols == 7 ? 'grid-cols-7' : ''}`

  return (
    <>
      <div className={gridClass} style={style}>
        {books?.map(book => (
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            key={book.title}
            onClick={_e => setSelectedBook(book)}
            sx={(theme) => ({
              "&:hover": {
                  backgroundColor: colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[1],
              },
              cursor: 'pointer',
            })}
          >
            <Card.Section>
              <Image
                src={book.thumbnailURL}
                height={160}
                alt={book.title}
                withPlaceholder
              />
            </Card.Section>
      
            <Group position="apart" mt="md" mb="xs">
              <Text
                weight={500}
                size="lg"
                sx={(theme) => ({
                  fontFamily: theme.headings.fontFamily,
                })}
              >
                {book.title}
              </Text>
              <div>
                {book.categories.map(category => (
                  <Badge key={category} color="pink" variant="light" style={{marginLeft: '8px'}}>
                    {category}
                  </Badge>
                ))}
              </div>
            </Group>
      
            <Text size="sm" color="dimmed">
              {book.shortDescription}
            </Text>
          </Card>
        ))}
      </div>
      <Toggle setNumCols={setNumCols} style={style} />
    </>
  )
}