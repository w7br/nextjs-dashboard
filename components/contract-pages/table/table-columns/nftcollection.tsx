import { NFTActionsCell } from "./actions/ActionsCell";
import { MediaCell } from "./cells/media-cell";
import { Code } from "@chakra-ui/react";
import { NFTMetadataOwner } from "@thirdweb-dev/sdk";
import React from "react";
import { Cell, Column } from "react-table";
import { AddressCopyButton } from "tw-components";
import { parseDescription } from "utils/parseDescription";

export function generateNFTCollectionTableColumns() {
  return [
    {
      Header: "ID",
      accessor: (row) => row.metadata.id.toString(),
    },
    {
      Header: "Media",
      accessor: (row) => row.metadata,
      Cell: MediaCell,
    },
    { Header: "Name", accessor: (row) => row.metadata.name },
    {
      Header: "Description",
      accessor: (row) => parseDescription(row.metadata.description),
    },
    {
      Header: "Properties",
      accessor: (row) => row.metadata.attributes || row.metadata.properties,
      Cell: ({ cell }: { cell: any }) => (
        <Code whiteSpace="pre">{JSON.stringify(cell.value, null, 2)}</Code>
      ),
    },
    {
      Header: "Owned By",
      accessor: (row) => row.owner,
      Cell: ({ cell }: { cell: Cell<NFTMetadataOwner, string> }) => (
        <AddressCopyButton address={cell.value} />
      ),
    },
    {
      Header: "Actions",
      id: "actions",
      Cell: NFTActionsCell || null,
    },
  ] as Column<NFTMetadataOwner>[];
}
