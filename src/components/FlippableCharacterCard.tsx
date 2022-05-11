import React, { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import CharacterCard from "./CharacterCard";

interface Props {
  image: string;
  text: string;
  color: string;
  key: string;
}

const FlippableCharacterCard = (props: Props) => {
  const { image, text, color, key } = props;

  const [front, setFront] = useState(true);

  const toggleCard = () => setFront(!front);

  return (
    <Flex
      className="FlippableCharacterCard"
      key={key}
      width="100%"
      onClick={toggleCard}
      css={{
        perspective: "1000px",
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <Box
        className="cardInner"
        css={{
          position: "relative",
          width: "100%",
          height: "100%",
          transition: "transform 0.8s",
          transformStyle: "preserve-3d",
        }}
        transform={front ? "none" : "rotateY(180deg)"}
      >
        <Box
          className="cardFront"
          width="100%"
          display={front ? "block" : "none"}
          css={{
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
          }}
        >
          <CharacterCard image={image} text={text} color={color} />
        </Box>
        <Box
          className="cardBack"
          width="100%"
          height="100%"
          display={front ? "none" : "block"}
          transform="rotateY(180deg)"
          css={{
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
          }}
        >
          <Flex
            backgroundColor={color}
            width="100%"
            height="100%"
            borderRadius={10}
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="4xl">⁉️</Text>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default FlippableCharacterCard;
