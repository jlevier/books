import { Badge, Modal, useMantineColorScheme, useMantineTheme, Image, Text, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CSSProperties, useContext, useEffect } from "react";
import { BookContext, BookContextType } from "../contexts/BookContext";
import { formatDate } from "../utils/Dates";

export const Details = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { selectedBook, setSelectedBook } = useContext(BookContext) as BookContextType;
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const borderStyle: CSSProperties = {
    borderBottom: '1px solid',
    borderColor: colorScheme === 'dark' ? '#343f46' : '#d4d4d8',
  };
  const headerBackgroundStyle: CSSProperties = {
    backgroundColor: colorScheme === 'dark' ? '#222222' : '#fdfdfd',
  };
  const headerStyle: CSSProperties = {
    color: colorScheme === 'dark' ? '#9cceff' : '#359595',
  };
  const labelClass = 'text-xs font-normal';

  useEffect(() => {
    selectedBook && open();
  }, [selectedBook, open]);

  const modalClose = () => {
    setSelectedBook(undefined);
    close();
  }
  
  return (
    <Modal
      opened={opened}
      size="lg"
      onClose={modalClose}
      title=" "
      overlayProps={{
        color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
    >
      <div className="flex gap-4">
        <div>
          <Image
              radius="md"
              src={selectedBook?.thumbnailURL}
              alt={selectedBook?.title}
              withPlaceholder
              width="165px"
              height="200px"
            />
        </div>
        <div className="w-full">
          <div>
            <div className="rounded p-1 text-2xl" style={{...borderStyle, ...headerStyle}}>
              <Text
                sx={(theme) => ({
                  fontFamily: theme.headings.fontFamily,
                })}
              >
                {selectedBook?.title}
              </Text>
            </div>
            <div className="py-2">
              {selectedBook?.categories.map(category => (
                <Badge key={category} color="orange" mr='8px' >{category}</Badge>
              ))}
            </div>
            <div>
              <span style={headerStyle} className={labelClass}>ISBN</span> {selectedBook?.isbn}
            </div>
            <div>
              <span style={headerStyle} className={labelClass}>STATUS</span> {selectedBook?.status}
            </div>
            <div>
              <span style={headerStyle} className={labelClass}>AUTHORS</span> {selectedBook?.authors.join(', ')}
            </div>
            <div>
              <span style={headerStyle} className={labelClass}>PAGES</span> {selectedBook?.pageCount}
            </div>
            <div>
              <span style={headerStyle} className={labelClass}>PUBLISHED</span> {selectedBook && formatDate(new Date(selectedBook.publishDate))}
            </div>
          </div>
        </div>
      </div>
      <ScrollArea h={250}>
        {selectedBook?.longDescription ? selectedBook.longDescription : '<No Description>'}
      </ScrollArea>
    </Modal>
  );
}