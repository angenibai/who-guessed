import { Heading, Text, VStack } from "@chakra-ui/react";

interface Props {}

const Create = (props: Props) => {
  const {} = props;

  return (
    <VStack className="Create">
      <Heading>Upload your own characters</Heading>
      <Heading as="h3" size="md">
        Recommended 24 characters per deck
      </Heading>
      <Text>not implemented sry</Text>
    </VStack>
  );
};

export default Create;
