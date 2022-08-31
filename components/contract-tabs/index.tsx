import { ContractCode } from "./code/ContractCode";
import { EmbedSetup } from "./embeds";
import { ContractPermissions } from "./permissions";
import { DropPhases } from "./phases/DropPhases";
import { ContractSettings } from "./settings/shared/ContractSettings";
import { isContractWithRoles } from "@3rdweb-sdk/react";
import { useContract } from "@thirdweb-dev/react";
import {
  EditionDrop,
  Marketplace,
  NFTDrop,
  SignatureDrop,
  TokenDrop,
  ValidContractInstance,
} from "@thirdweb-dev/sdk";
import React, { useMemo } from "react";

export interface ContractTab {
  title: string;
  content: JSX.Element;
}

export function useContractTabs(
  contract?: ValidContractInstance,
): ContractTab[] {
  const { contract: actualContract, data } = useContract(
    contract?.getAddress(),
  );

  return useMemo(() => {
    const tabs: ContractTab[] = [];
    if (isContractWithRoles(contract)) {
      tabs.push({
        title: "Permissions",
        content: <ContractPermissions contract={contract} />,
      });
    }

    if (
      contract instanceof NFTDrop ||
      contract instanceof TokenDrop ||
      contract instanceof SignatureDrop
    ) {
      tabs.push({
        title: "Claim Phases",
        content: <DropPhases contract={contract} />,
      });
    }
    if (
      contract instanceof NFTDrop ||
      contract instanceof EditionDrop ||
      contract instanceof Marketplace ||
      contract instanceof TokenDrop ||
      contract instanceof SignatureDrop
    ) {
      tabs.push({
        title: "Embed",
        content: <EmbedSetup contract={contract} />,
      });
    }

    if (data?.contractType && actualContract) {
      tabs.push({
        title: "Code",
        content: (
          <ContractCode
            contract={actualContract}
            contractType={data.contractType}
          />
        ),
      });
    }
    tabs.push({
      title: "Settings",
      content: <ContractSettings contract={contract} />,
    });

    return tabs;
  }, [contract, actualContract, data]);
}
