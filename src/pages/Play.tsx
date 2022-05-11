import {
  Box,
  Flex,
  Grid,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CharacterCard from "../components/CharacterCard";
import FlippableCharacterCard from "../components/FlippableCharacterCard";
import { Card, Deck } from "../interfaces";

interface Props {}

const defaultCard: Card = {
  name: "Frankie the Fox",
  src: "https://assets.change.org/photos/0/fx/do/QYFxdouiNNNxyoy-1600x900-noPad.jpg?1592304066",
  link: "https://google.com",
};

const Play = (props: Props) => {
  const {} = props;
  const { deckId = "ABCD" } = useParams();

  const [cards, setCards] = useState<Card[]>(new Array(24).fill(defaultCard));
  const [deckName, setDeckName] = useState<string>("First Deck");
  const [targetCard, setTargetCard] = useState<Card>(defaultCard);
  const [color, setColor] = useState("orange.300");

  useEffect(() => {}, []);

  return (
    <Box className="Play" width="100%">
      <VStack className="headingSection" mb={6}>
        <Heading as="h1" size="xl">
          {deckName}
        </Heading>
        <Heading size="sm" as="h3">
          {deckId}
        </Heading>
      </VStack>
      <VStack className="flipSection" mb={6} width="100%">
        <Text size="md">Click the cards below to flip</Text>
        <Grid
          className="cardsArea"
          templateColumns="repeat(auto-fit, minmax(110px, 1fr))"
          gap="10px"
          width="100%"
        >
          {cards.map((card, i) => (
            <FlippableCharacterCard
              key={`card-${i}`}
              image={targetCard.src}
              text={targetCard.name}
              color={color}
            />
          ))}
        </Grid>
      </VStack>
      <VStack className="targetSection" mb={10}>
        <Heading as="h3" size="md">
          Your person is:
        </Heading>
        <CharacterCard
          image={targetCard.src}
          text={targetCard.name}
          color={color}
        />
        <Text size="md">
          Your opponents must guess the identity of your card.
        </Text>
      </VStack>
    </Box>
  );
};

export default Play;
