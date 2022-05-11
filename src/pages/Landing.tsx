import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Create from "./Create";
import Generate from "./Generate";
import Join from "./Join";

interface Props {}

const Landing = (props: Props) => {
  const {} = props;

  return (
    <VStack className="Landing" width="100%">
      <Tabs width="100%" align="center" size="lg" colorScheme="red">
        <TabList mb={6}>
          <Tab>Join</Tab>
          <Tab>Generate</Tab>
          <Tab>Create</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Join />
          </TabPanel>
          <TabPanel>
            <Generate />
          </TabPanel>
          <TabPanel>
            <Create />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default Landing;
