import { Heading, VStack } from "@chakra-ui/react";
import React from "react";

interface Props {}

const Create = (props: Props) => {
  const {} = props;

  return (
    <VStack className="Create">
      <Heading>Upload your own characters</Heading>
      <Heading as="h3" size="md">
        Recommended 24 characters per deck
      </Heading>
    </VStack>
  );
};

export default Create;
