import * as React from "react";
import {
  ChakraProvider,
  Box,
  theme,
  Center,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link as RouterLink,
} from "react-router-dom";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import Play from "./pages/Play";
import { db } from "./utils/firebase";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box className="App">
      <BrowserRouter>
        <Flex className="navbar" p={4}>
          <Box p={2}>
            <RouterLink to="/">
              <Heading size="md">Who Guessed ⁉️</Heading>
            </RouterLink>
          </Box>
          <Spacer />
          <Box>
            <ColorModeSwitcher />
          </Box>
        </Flex>
        <Center
          className="appBody"
          margin="auto"
          maxW="1000px"
          width="90%"
          textAlign="center"
          alignItems="stretch"
        >
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Landing db={db} />} />
            <Route path="/play/:deckId" element={<Play db={db} />} />
          </Routes>
        </Center>
      </BrowserRouter>
    </Box>
  </ChakraProvider>
);
