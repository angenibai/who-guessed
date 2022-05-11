import {
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Spacer,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { ChangeEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {}

const Join = (props: Props) => {
  const {} = props;

  const navigate = useNavigate();

  const [inputCode, setInputCode] = useState("");
  const [isError, setError] = useState(false);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputCode(e.target.value.toUpperCase());

  const checkError = () => {
    if (inputCode !== "ABCD") {
      setError(true);
      return true;
    }

    setError(false);
    return false;
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (checkError() === false) {
      navigate(`/play/${inputCode}`);
    }
  };

  const red = useColorModeValue("red.600", "red.400");

  return (
    <VStack className="Join">
      <Heading mb={6}>Play with an existing deck</Heading>
      <FormControl maxW="180px" isInvalid={isError}>
        <Input
          id="deckCode"
          type="text"
          value={inputCode}
          onChange={handleInputChange}
          placeholder="XYZA"
          height="fit-content"
          textAlign="center"
          fontSize={40}
          fontWeight={700}
          _placeholder={{ opacity: 0.4, color: "red.300" }}
          borderColor="red.300"
          focusBorderColor="red.400"
          borderWidth={2}
          paddingTop={2}
          paddingBottom={2}
          colorScheme="red"
        />
        {isError && (
          <FormErrorMessage fontSize={16}>Invalid code</FormErrorMessage>
        )}
      </FormControl>
      <Spacer />
      <Button
        variant="solid"
        backgroundColor={red}
        onClick={handleSubmit}
        size="md"
        color="whiteAlpha.900"
      >
        JOIN
      </Button>
    </VStack>
  );
};

export default Join;
