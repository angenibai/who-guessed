import { Heading, VStack } from "@chakra-ui/react";
import React from "react";

interface Props {}

const Generate = (props: Props) => {
  const {} = props;

  return (
    <VStack className="Generate">
      <Heading>Select tags to include in your deck</Heading>
    </VStack>
  );
};

export default Generate;
