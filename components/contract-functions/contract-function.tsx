import { InteractiveAbiFunction } from "./interactive-abi-function";
import {
  Box,
  Divider,
  Flex,
  GridItem,
  List,
  ListItem,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { AbiEvent, AbiFunction, SmartContract } from "@thirdweb-dev/sdk/evm";
import { MarkdownRenderer } from "components/contract-components/published-contract/markdown-renderer";
import { camelToTitle } from "contract-ui/components/solidity-inputs/helpers";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Badge, Button, Card, Heading, Text } from "tw-components";

interface ContractFunctionProps {
  fn?: AbiFunction | AbiEvent;
  contract?: SmartContract;
}

export const ContractFunction: React.FC<ContractFunctionProps> = ({
  fn,
  contract,
}) => {
  if (!fn) {
    return null;
  }

  const isFunction = "stateMutability" in fn;

  return (
    <Flex direction="column" gap={1.5}>
      <Flex
        alignItems={{ base: "start", md: "center" }}
        gap={2}
        direction={{ base: "column", md: "row" }}
      >
        <Flex alignItems="baseline" gap={1} flexWrap="wrap">
          <Heading size="subtitle.md">{camelToTitle(fn.name)}</Heading>
          <Heading size="subtitle.sm" color="gray.600">
            ({fn.name}){" "}
          </Heading>
        </Flex>
        {isFunction && (
          <Badge size="label.sm" variant="subtle" colorScheme="green">
            {fn.stateMutability}
          </Badge>
        )}
      </Flex>
      {fn.comment && (
        <MarkdownRenderer
          markdownText={fn.comment
            ?.replaceAll(/See \{(.+)\}(\.)?/gm, "")
            .replaceAll("{", '"')
            .replaceAll("}", '"')
            .replaceAll("'", '"')}
        />
      )}
      {fn.inputs && fn.inputs.length && !contract ? (
        <>
          <Divider my={2} />
          <Flex flexDir="column" gap={3}>
            <Heading size="label.lg">Inputs</Heading>
            <Box
              borderTopRadius="lg"
              p={0}
              overflowX="auto"
              position="relative"
            >
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th border="none">
                      <Heading as="label" size="label.sm" color="faded">
                        Name
                      </Heading>
                    </Th>
                    <Th border="none">
                      <Heading as="label" size="label.sm" color="faded">
                        Type
                      </Heading>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {fn.inputs.map((input, idx) => (
                    <Tr
                      borderBottomWidth={1}
                      _last={{ borderBottomWidth: 0 }}
                      key={`${input.name}+${idx}}`}
                    >
                      <Td
                        borderBottomWidth="inherit"
                        borderBottomColor="borderColor"
                      >
                        {input?.name ? (
                          <Text fontFamily="mono">{input.name}</Text>
                        ) : (
                          <Text fontStyle="italic" color="gray.500">
                            No name defined
                          </Text>
                        )}
                      </Td>
                      <Td
                        borderBottomWidth="inherit"
                        borderBottomColor="borderColor"
                      >
                        <Text fontFamily="mono">{input.type}</Text>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Flex>
        </>
      ) : null}

      {contract && isFunction && (
        <InteractiveAbiFunction
          key={JSON.stringify(fn)}
          contract={contract}
          abiFunction={fn}
        />
      )}
    </Flex>
  );
};

interface ContractFunctionsPanelProps {
  fnsOrEvents: (AbiFunction | AbiEvent)[];
  contract?: SmartContract;
}

export const ContractFunctionsPanel: React.FC<ContractFunctionsPanelProps> = ({
  fnsOrEvents,
  contract,
}) => {
  const isFunction = "stateMutability" in fnsOrEvents[0];

  const writeFunctions: AbiFunction[] = useMemo(() => {
    return fnsOrEvents.filter(
      (fn) =>
        (fn as AbiFunction).stateMutability !== "pure" &&
        (fn as AbiFunction).stateMutability !== "view" &&
        "stateMutability" in fn,
    ) as AbiFunction[];
  }, [fnsOrEvents]);
  const viewFunctions: AbiFunction[] = useMemo(() => {
    return fnsOrEvents.filter(
      (fn) =>
        (fn as AbiFunction).stateMutability === "pure" ||
        (fn as AbiFunction).stateMutability === "view",
    ) as AbiFunction[];
  }, [fnsOrEvents]);
  const events = useMemo(() => {
    return fnsOrEvents.filter((fn) => !("stateMutability" in fn)) as AbiEvent[];
  }, [fnsOrEvents]);

  const [selectedFunction, setSelectedFunction] = useState<
    AbiFunction | AbiEvent
  >(fnsOrEvents[0]);

  return (
    <SimpleGrid height="100%" columns={12} gap={3}>
      <GridItem
        as={Card}
        px={0}
        pt={0}
        height="100%"
        overflow="auto"
        colSpan={{ base: 12, md: 4 }}
        overflowY="auto"
      >
        <List height="100%" overflowX="hidden">
          {(writeFunctions.length > 0 || viewFunctions.length > 0) && (
            <Tabs
              colorScheme="gray"
              h="100%"
              position="relative"
              display="flex"
              flexDir="column"
            >
              <TabList as={Flex}>
                {writeFunctions.length > 0 && (
                  <Tab gap={2} flex={"1 1 0"}>
                    <Heading color="inherit" my={1} size="label.md">
                      Write
                    </Heading>
                  </Tab>
                )}
                {viewFunctions.length > 0 && (
                  <Tab gap={2} flex={"1 1 0"}>
                    <Heading color="inherit" my={1} size="label.md">
                      Read
                    </Heading>
                  </Tab>
                )}
              </TabList>
              <TabPanels h="auto" overflow="auto">
                <TabPanel>
                  {writeFunctions.map((fn) => (
                    <FunctionsOrEventsListItem
                      key={fn.signature}
                      fn={fn}
                      isFunction={isFunction}
                      selectedFunction={selectedFunction}
                      setSelectedFunction={setSelectedFunction}
                    />
                  ))}
                </TabPanel>
                <TabPanel>
                  {viewFunctions.map((fn) => (
                    <FunctionsOrEventsListItem
                      key={fn.name}
                      fn={fn}
                      isFunction={isFunction}
                      selectedFunction={selectedFunction}
                      setSelectedFunction={setSelectedFunction}
                    />
                  ))}
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}

          {events.length > 0 && (
            <Box px={4} pt={2} overflowX="hidden">
              {events.map((fn) => (
                <FunctionsOrEventsListItem
                  key={isFunction ? (fn as AbiFunction).signature : fn.name}
                  fn={fn}
                  isFunction={isFunction}
                  selectedFunction={selectedFunction}
                  setSelectedFunction={setSelectedFunction}
                />
              ))}
            </Box>
          )}
        </List>
      </GridItem>
      <GridItem
        as={Card}
        height="100%"
        overflow="auto"
        colSpan={{ base: 12, md: 8 }}
      >
        <ContractFunction fn={selectedFunction} contract={contract} />
      </GridItem>
    </SimpleGrid>
  );
};

interface FunctionsOrEventsListItemProps {
  fn: AbiFunction | AbiEvent;
  isFunction: boolean;
  selectedFunction: AbiFunction | AbiEvent;
  setSelectedFunction: Dispatch<SetStateAction<AbiFunction | AbiEvent>>;
}

const FunctionsOrEventsListItem: React.FC<FunctionsOrEventsListItemProps> = ({
  fn,
  isFunction,
  selectedFunction,
  setSelectedFunction,
}) => {
  return (
    <ListItem my={0.5}>
      <Button
        size="sm"
        fontWeight={
          (isFunction &&
            (selectedFunction as AbiFunction).signature ===
              (fn as AbiFunction).signature) ||
          (!isFunction &&
            (selectedFunction as AbiEvent).name === (fn as AbiEvent).name)
            ? 600
            : 400
        }
        opacity={
          (isFunction &&
            (selectedFunction as AbiFunction).signature ===
              (fn as AbiFunction).signature) ||
          (!isFunction &&
            (selectedFunction as AbiEvent).name === (fn as AbiEvent).name)
            ? 1
            : 0.65
        }
        onClick={() => setSelectedFunction(fn)}
        color="heading"
        _hover={{ opacity: 1, textDecor: "underline" }}
        variant="link"
        fontFamily="mono"
      >
        {fn.name}
      </Button>
    </ListItem>
  );
};
