import { Books } from './components/Books';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { Theme } from './components/Theme';
import { useLocalStorage } from '@mantine/hooks';
import BookProvider from './contexts/BookContext';
import '@fontsource/inter';
import '@fontsource/roboto';

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{ 
          colorScheme,
          fontFamily: 'roboto, sans-serif',
          headings: { fontFamily: 'inter, serif' }
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Theme>
          <BookProvider>
            <Books />
          </BookProvider>
        </Theme>
      </MantineProvider>
     </ColorSchemeProvider>
  );
}

export default App;