import { Box, ChakraProvider, Heading } from '@chakra-ui/react';
import Todo from './src/Todo';

const Home = () => {
    return (
        <ChakraProvider>
            <Box >
                <Todo />
            </Box>
        </ChakraProvider>
    );
};

export default Home;
