import { Box, Image, VStack, Text, Flex } from "@chakra-ui/react";
import React from "react";

interface Props {
  image: string;
  text: string;
  color: string;
}

const CharacterCard = (props: Props) => {
  const { image, text, color } = props;

  return (
    <Flex
      className="CharacterCard"
      width="100%"
      maxW="200px"
      height="fit-content"
      padding="10px 0"
      borderWidth={2}
      borderRadius={10}
      backgroundColor={color}
      alignItems="center"
      justifyContent="center"
      position="relative"
      css={{
        "&:after": {
          content: '""',
          display: "block",
          paddingBottom: "125%",
        },
      }}
    >
      <VStack alignItems="center" justifyContent="center" width="90%">
        <Box
          className="cardFrame"
          borderWidth={2}
          margin="auto"
          width="100%"
          display="block"
          position="relative"
          paddingTop="125%"
        >
          <Image
            src={image}
            width="100%"
            height="100%"
            objectFit="cover"
            position="absolute"
            top={0}
            left={0}
          />
        </Box>
        <Box
          className="cardTextBox"
          backgroundColor="whiteAlpha.900"
          width="100%"
        >
          <Text fontSize="80%">{text}</Text>
        </Box>
      </VStack>
    </Flex>
  );
};

export default CharacterCard;
