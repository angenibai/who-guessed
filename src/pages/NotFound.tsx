import { Box, Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box className="NotFound">
      <Heading mb={6}>I think you're lost</Heading>
      <Link to="/">
        <Button variant="solid" backgroundColor="red.400">
          Go home
        </Button>
      </Link>
    </Box>
  );
};

export default NotFound;
