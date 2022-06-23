import '../styles/globals.css';
import { wrapper } from '../redux/store';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';

const theme = extendTheme({
  colors: {
    brand: {
      700: '#C71D1D',
      900: '#A41818',
    },
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
});

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
}
export default wrapper.withRedux(MyApp);
