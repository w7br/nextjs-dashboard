import { ImportModal } from "../import-contract/modal";
import { ShowMoreButton } from "./show-more-button";
import {
  useAllContractList,
  useContractMetadataWithAddress,
} from "@3rdweb-sdk/react";
import { useRemoveContractMutation } from "@3rdweb-sdk/react/hooks/useRegistry";
import {
  Box,
  ButtonGroup,
  Center,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Skeleton,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  ChainId,
  CommonContractOutputSchema,
  ContractType,
  ContractWithMetadata,
  PrebuiltContractType,
  SchemaForPrebuiltContractType,
} from "@thirdweb-dev/sdk/evm";
import { MismatchButton } from "components/buttons/MismatchButton";
import { GettingStartedBox } from "components/getting-started/box";
import { GettingStartedCard } from "components/getting-started/card";
import { ChainIcon } from "components/icons/ChainIcon";
import { CustomSDKContext } from "contexts/custom-sdk-context";
import { useAllChainsData } from "hooks/chains/allChains";
import { useChainSlug } from "hooks/chains/chainSlug";
import { useSupportedChainsRecord } from "hooks/chains/configureChains";
import { useRouter } from "next/router";
import React, { memo, useMemo, useState } from "react";
import {
  FiArrowRight,
  FiFilePlus,
  FiMoreVertical,
  FiPlus,
  FiX,
} from "react-icons/fi";
import { Column, Row, useTable } from "react-table";
import {
  Badge,
  Button,
  ChakraNextLink,
  CodeBlock,
  Heading,
  LinkButton,
  MenuItem,
  Text,
  TrackedIconButton,
} from "tw-components";
import { AddressCopyButton } from "tw-components/AddressCopyButton";
import { ComponentWithChildren } from "types/component-with-children";
import { shortenIfAddress } from "utils/usedapp-external";
import { z } from "zod";

interface DeployedContractsProps {
  noHeader?: boolean;
  contractListQuery: ReturnType<typeof useAllContractList>;
  limit?: number;
}

export const DeployedContracts: React.FC<DeployedContractsProps> = ({
  noHeader,
  contractListQuery,
  limit = 10,
}) => {
  const [showMoreLimit, setShowMoreLimit] = useState(limit);

  const slicedData = useMemo(() => {
    if (contractListQuery.data) {
      return contractListQuery.data.slice(0, showMoreLimit);
    }
    return [];
  }, [contractListQuery.data, showMoreLimit]);

  const router = useRouter();

  const modalState = useDisclosure();

  return (
    <>
      {!noHeader && (
        <>
          <ImportModal
            isOpen={modalState.isOpen}
            onClose={modalState.onClose}
          />
          <Flex
            justify="space-between"
            align="top"
            gap={4}
            direction={{ base: "column", md: "row" }}
            pos="sticky"
            top={{ base: "56px", md: 0 }}
            py={{ base: 4, md: 8 }}
            zIndex="docked"
            backdropFilter="blur(4px)"
            _after={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: -1,
              opacity: 0.8,
              bg: "linear-gradient(180deg, var(--chakra-colors-backgroundBody) 50%, transparent 100%)",
            }}
          >
            <Flex gap={2} direction="column">
              <Heading size="title.md">Your contracts</Heading>
              <Text fontStyle="italic" maxW="container.md">
                The list of contract instances that you have deployed or
                imported with thirdweb across all networks.
              </Text>
            </Flex>
            <ButtonGroup>
              <Button
                leftIcon={<FiFilePlus />}
                variant="outline"
                onClick={modalState.onOpen}
              >
                Import contract
              </Button>
              <LinkButton
                leftIcon={<FiPlus />}
                colorScheme="primary"
                href="/explore"
              >
                Deploy contract
              </LinkButton>
            </ButtonGroup>
          </Flex>
        </>
      )}

      <ContractTable combinedList={slicedData}>
        {contractListQuery.isLoading && (
          <Center>
            <Flex py={4} direction="row" gap={4} align="center">
              <Spinner size="sm" />
              <Text>Loading contracts</Text>
            </Flex>
          </Center>
        )}
        {contractListQuery.data.length === 0 && contractListQuery.isFetched && (
          <Center>
            <Flex py={4} direction="column" gap={4} align="center">
              {router.pathname === "/dashboard" ? (
                <GettingStartedBox title="No contracts found, yet!">
                  <GettingStartedCard
                    title="Explore"
                    description={
                      <>
                        Browse a large collection of ready-to-deploy contracts
                        built by thirdweb and other contract developers. Find a
                        contract for your app&apos; or game&apos;s use case.
                      </>
                    }
                    icon={require("public/assets/product-icons/contracts.png")}
                    linkProps={{
                      category: "getting-started",
                      label: "browse-contracts",
                      href: "/explore",
                      children: (
                        <>
                          Get Started <Icon as={FiArrowRight} />
                        </>
                      ),
                    }}
                  />
                  <GettingStartedCard
                    title="Build your own"
                    description={
                      <>
                        Get started with the <b>Solidity SDK</b> to create
                        custom contracts specific to your use case.
                      </>
                    }
                    icon={require("public/assets/product-icons/extensions.png")}
                    linkProps={{
                      category: "getting-started",
                      label: "custom-contracts",
                      href: "https://portal.thirdweb.com/solidity",
                      isExternal: true,
                      children: (
                        <>
                          View Docs <Icon as={FiArrowRight} />
                        </>
                      ),
                    }}
                  />
                  <GettingStartedCard
                    title="Deploy from source"
                    description={
                      <>
                        You are ready to deploy your contract with our
                        interactive <b>CLI</b>.
                      </>
                    }
                    icon={require("public/assets/product-icons/deploy.png")}
                  >
                    <CodeBlock
                      mt="auto"
                      language="bash"
                      code="npx thirdweb deploy"
                    />
                  </GettingStartedCard>
                </GettingStartedBox>
              ) : (
                <Text>No contracts found, yet!</Text>
              )}
            </Flex>
          </Center>
        )}
        {contractListQuery.data.length > slicedData.length && (
          <ShowMoreButton
            limit={limit}
            showMoreLimit={showMoreLimit}
            setShowMoreLimit={setShowMoreLimit}
          />
        )}
      </ContractTable>
    </>
  );
};

type RemoveFromDashboardButtonProps = {
  chainId: number;
  contractAddress: string;
  registry: "old" | "new";
};

const RemoveFromDashboardButton: React.FC<RemoveFromDashboardButtonProps> = ({
  chainId,
  contractAddress,
  registry,
}) => {
  const mutation = useRemoveContractMutation();

  if (registry === "old") {
    return (
      <CustomSDKContext desiredChainId={chainId}>
        <MismatchButton
          borderWidth={0}
          onClick={(e) => {
            e.stopPropagation();
            mutation.mutate({ chainId, contractAddress, registry });
          }}
          isDisabled={mutation.isLoading}
        >
          <Flex align="center" gap={2} w="full">
            {mutation.isLoading ? (
              <Spinner size="sm" />
            ) : (
              <Icon as={FiX} color="red.500" />
            )}
            <Heading as="span" size="label.md">
              Remove from dashboard
            </Heading>
          </Flex>
        </MismatchButton>
      </CustomSDKContext>
    );
  }
  return (
    <MenuItem
      borderWidth={0}
      onClick={(e) => {
        e.stopPropagation();
        mutation.mutate({ chainId, contractAddress, registry });
      }}
      isDisabled={mutation.isLoading}
      closeOnSelect={false}
    >
      <Flex align="center" gap={2} w="full">
        {mutation.isLoading ? (
          <Spinner size="sm" />
        ) : (
          <Icon as={FiX} color="red.500" />
        )}
        <Heading as="span" size="label.md">
          Remove from dashboard
        </Heading>
      </Flex>
    </MenuItem>
  );
};

interface ContractTableProps {
  combinedList: {
    chainId: ChainId;
    address: string;
    contractType: () => Promise<ContractType>;
    metadata: () => Promise<z.output<typeof CommonContractOutputSchema>>;
    extensions: () => Promise<string[]>;
  }[];
  isFetching?: boolean;
}

export const ContractTable: ComponentWithChildren<ContractTableProps> = ({
  combinedList,
  children,
  isFetching,
}) => {
  const { chainIdToChainRecord } = useAllChainsData();
  const configuredChains = useSupportedChainsRecord();

  const columns: Column<(typeof combinedList)[number]>[] = useMemo(
    () => [
      {
        Header: "Name",
        accessor: (row) => row.metadata,
        Cell: (cell: any) => {
          return <AsyncContractNameCell cell={cell.row.original} />;
        },
      },
      {
        Header: "Extensions",
        accessor: (row) => row.extensions,
        Cell: (cell: any) => <AsyncExtensionCell cell={cell.row.original} />,
      },
      {
        Header: "Network",
        accessor: (row) => row.chainId,
        Cell: (cell: any) => {
          const data =
            configuredChains[cell.row.original.chainId] ||
            chainIdToChainRecord[cell.row.original.chainId];
          const cleanedChainName =
            data?.name?.replace("Mainnet", "").trim() ||
            `Unknown Network (#${cell.row.original.chainId})`;
          return (
            <Flex align="center" gap={2}>
              <ChainIcon size={24} ipfsSrc={data?.icon?.url} />
              <Text size="label.md">{cleanedChainName}</Text>
              {data?.testnet && (
                <Badge colorScheme="gray" textTransform="capitalize">
                  Testnet
                </Badge>
              )}
            </Flex>
          );
        },
      },
      {
        Header: "Contract Address",
        accessor: (row) => row.address,
        Cell: (cell: any) => {
          return <AddressCopyButton address={cell.row.original.address} />;
        },
      },
      {
        id: "actions",
        Cell: (cell: any) => {
          return (
            <Menu isLazy>
              <MenuButton
                as={TrackedIconButton}
                icon={<FiMoreVertical />}
                variant="gost"
                onClick={(e) => e.stopPropagation()}
              />
              <MenuList
                onClick={(e) => e.stopPropagation()}
                borderWidth={1}
                borderColor="borderColor"
                borderRadius="lg"
                overflow="hidden"
              >
                <RemoveFromDashboardButton
                  contractAddress={cell.cell.row.original.address}
                  chainId={cell.cell.row.original.chainId}
                  registry={
                    cell.cell.row.original._isMultiChain ? "new" : "old"
                  }
                />
              </MenuList>
            </Menu>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [configuredChains],
  );

  const defaultColumn = useMemo(
    () => ({
      Filter: "",
    }),
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: combinedList,
      defaultColumn,
    });

  return (
    <Box
      borderTopRadius="lg"
      p={0}
      overflowX="auto"
      position="relative"
      overflowY="hidden"
    >
      {isFetching && (
        <Spinner
          color="primary"
          size="xs"
          position="absolute"
          top={2}
          right={4}
        />
      )}
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <Th {...column.getHeaderProps()} border="none">
                  <Text as="label" size="label.sm" color="faded">
                    {column.render("Header")}
                  </Text>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>

        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <ContractTableRow
                row={row}
                key={row.original.address + row.original.chainId}
              />
            );
          })}
        </Tbody>
      </Table>
      {children}
    </Box>
  );
};

const ContractTableRow = memo(({ row }: { row: Row<ContractWithMetadata> }) => {
  const chainSlug = useChainSlug(row.original.chainId);
  const router = useRouter();

  return (
    <Tr
      {...row.getRowProps()}
      role="group"
      // this is a hack to get around the fact that safari does not handle position: relative on table rows
      style={{ cursor: "pointer" }}
      onClick={() => {
        router.push(`/${chainSlug}/${row.original.address}`);
      }}
      // end hack
      borderBottomWidth={1}
      _last={{ borderBottomWidth: 0 }}
    >
      {row.cells.map((cell) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <Td
            borderBottomWidth="inherit"
            borderBottomColor="borderColor"
            {...cell.getCellProps()}
          >
            {cell.render("Cell")}
          </Td>
        );
      })}
    </Tr>
  );
});

ContractTableRow.displayName = "ContractTableRow";

interface AsyncExtensionCellProps {
  cell: {
    address: string;
    chainId: number;
    contractType: (() => Promise<ContractType>) | undefined;
    metadata: () => Promise<
      z.infer<SchemaForPrebuiltContractType<PrebuiltContractType>["output"]>
    >;
    extensions: () => Promise<string[]>;
  };
}

function getImportantExtension(extensions: string[]) {
  const importantExtensions = ["ERC20", "ERC721", "ERC1155"];
  const lowerCaseExtensions = extensions.map((ext) => ext.toLowerCase());
  const importantExtension = importantExtensions.find((ext) =>
    lowerCaseExtensions.includes(ext.toLowerCase()),
  );
  if (!importantExtension) {
    return null;
  }
  // how many extensions are there that start with the important extension
  const importantExtensionCount = lowerCaseExtensions.filter((ext) =>
    ext.startsWith(importantExtension.toLowerCase() || ""),
  ).length;
  return { ext: importantExtension, count: importantExtensionCount - 1 };
}

const AsyncExtensionCell = memo(({ cell }: AsyncExtensionCellProps) => {
  const contractExtensionsQuery = useQuery({
    queryKey: [
      "contract-extension-type",
      { chainId: cell.chainId, address: cell.address },
    ],
    queryFn: () => {
      return Promise.all([
        cell.extensions ? cell.extensions().catch(() => []) : [],
        cell.contractType
          ? cell.contractType().catch(() => "custom")
          : "custom",
      ]);
    },
    enabled: !!cell.extensions || !!cell.contractType,
    refetchOnWindowFocus: false,
    // contract type of a contract does not change - so safe to set high staleTime ( currently set to 1 hour )
    staleTime: 1000 * 60 * 60,
  });

  const [importantExtension, contractType, extensions] = useMemo(() => {
    const [exts, cType] = contractExtensionsQuery.data || [[], ""];
    const imp = getImportantExtension(exts);
    return [imp, cType, exts];
  }, [contractExtensionsQuery.data]);

  let tag: JSX.Element;

  if (importantExtension) {
    tag = (
      <Flex gap={2} align="center">
        <Text size="label.md" as="h4">
          {importantExtension.ext}
        </Text>
        {importantExtension.count > 0 ? (
          <Badge
            lineHeight={1}
            size="label.sm"
            variant="outline"
            colorScheme="blue"
          >
            +{extensions.length - importantExtension.count}
          </Badge>
        ) : null}
      </Flex>
    );
  } else if (contractType !== "custom") {
    tag = (
      <Text textTransform="capitalize" size="label.md" as="h4">
        {contractType}
      </Text>
    );
  } else {
    tag = (
      <Text fontStyle="italic" size="label.md" as="h4">
        {extensions?.length === 0 ? "No" : extensions.length} Extension
        {extensions.length === 1 ? "" : "s"}
      </Text>
    );
  }

  return (
    <Skeleton isLoaded={!contractExtensionsQuery.isInitialLoading}>
      {tag}
    </Skeleton>
  );
});

AsyncExtensionCell.displayName = "AsyncExtensionCell";

interface AsyncContractNameCellProps {
  cell: {
    address: string;
    chainId: number;
    contractType: ContractType;
    metadata: () => Promise<
      z.infer<SchemaForPrebuiltContractType<PrebuiltContractType>["output"]>
    >;
  };
}

const AsyncContractNameCell = memo(({ cell }: AsyncContractNameCellProps) => {
  const chainSlug = useChainSlug(cell.chainId);
  const metadataQuery = useContractMetadataWithAddress(
    cell.address,
    cell.metadata,
    cell.chainId,
  );

  return (
    <Skeleton isLoaded={!metadataQuery.isLoading}>
      <ChakraNextLink href={`/${chainSlug}/${cell.address}`} passHref>
        <Text
          color="blue.500"
          _dark={{ color: "blue.400" }}
          size="label.md"
          _groupHover={{ textDecor: "underline" }}
        >
          {metadataQuery.data?.name || shortenIfAddress(cell.address)}
        </Text>
      </ChakraNextLink>
    </Skeleton>
  );
});

AsyncContractNameCell.displayName = "AsyncContractNameCell";
