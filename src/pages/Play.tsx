import {
  Box,
  Button,
  Grid,
  Heading,
  Spacer,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { doc, Firestore, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CharacterCard from "../components/CharacterCard";
import FlippableCharacterCard from "../components/FlippableCharacterCard";
import { Card } from "../utils/interfaces";
import {
  CARDS_COLLECTION,
  DECKS_COLLECTION,
  DEFAULT_CARD,
} from "../utils/constants";
import { sample } from "lodash";

interface Props {
  db: Firestore;
}

const Play = (props: Props) => {
  const { db } = props;
  const { deckId = "ABCD" } = useParams();

  const [cards, setCards] = useState<Card[]>([]);
  const [targetCard, setTargetCard] = useState<Card>(DEFAULT_CARD);
  // const [color, setColor] = useState("orange.300");
  const color = "orange.300";
  const [deckName, setDeckName] = useState("");
  const [isError, setIsError] = useState(false);

  const fetchAllCardData = async (cardIds: string[]) => {
    const cardPromises = cardIds.map((cardId) => {
      const cardRef = doc(db, CARDS_COLLECTION, cardId);
      return getDoc(cardRef);
    });
    Promise.all(cardPromises)
      .then((snapshots) => {
        const allData = snapshots.map((snapshot) => {
          const data = snapshot.data();
          if (data) {
            return {
              link: data.link,
              name: data.name,
              src: data.src,
            };
          }
          return DEFAULT_CARD;
        });
        setCards([...allData]);
      })
      .catch((err) => {
        setIsError(true);
        console.error(err);
      });
  };

  const fetchTargetData = (targetId: string) => {
    const cardRef = doc(db, CARDS_COLLECTION, targetId);
    return getDoc(cardRef);
  };

  const fetchDeckData = (deckId: string) => {
    const deckRef = doc(db, DECKS_COLLECTION, deckId);
    return getDoc(deckRef);
  };

  useEffect(() => {
    fetchDeckData(deckId).then((deckSnap) => {
      if (!deckSnap.exists()) {
        setIsError(true);
        console.error("deck doesn't exist");
        return;
      }
      const deckData = deckSnap.data();
      setDeckName(deckData.name);

      fetchAllCardData(deckData.cards);

      const targetId = sample(deckData.cards);
      fetchTargetData(targetId).then((targetSnap) => {
        const data = targetSnap.data();
        if (data) {
          setTargetCard({
            link: data.link,
            name: data.name,
            src: data.src,
          });
        } else {
          setIsError(true);
          console.error("error fetching target");
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (cards.length === 0 && !isError) {
    return (
      <Box className="Play" width="100%">
        <Spinner size="xl" color="red.400" />
      </Box>
    );
  }

  return (
    <Box className="Play" width="100%">
      {isError ? (
        <VStack>
          <Heading as="h1" size="xl">
            yikes
          </Heading>
          <Text>
            There was an error loading your deck. Please try a different code
          </Text>
          <Spacer />
          <Link to="/">
            <Button variant="solid" backgroundColor="red.400">
              Go home
            </Button>
          </Link>
        </VStack>
      ) : (
        <>
          <VStack className="headingSection" mb={6}>
            <Heading as="h1" size="xl">
              {deckName}
            </Heading>
            <Heading size="md" as="h3" color="red.400" fontWeight={500}>
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
              {cards.map((card: Card, i: number) => (
                <FlippableCharacterCard
                  key={`card-${i}`}
                  image={card.src}
                  text={card.name.toUpperCase()}
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
              text={targetCard.name.toUpperCase()}
              color={color}
            />
            <Text size="md">
              Your opponents must guess the identity of your card.
            </Text>
          </VStack>
        </>
      )}
    </Box>
  );
};

export default Play;
