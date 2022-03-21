import { useActiveChainId, useWeb3 } from ".";
import { useQueryWithNetwork } from "./query/useQueryWithNetwork";
import { AlchemyWeb3, createAlchemyWeb3 } from "@alch/alchemy-web3";
import { alchemyUrlMap } from "components/app-layouts/providers";
import { useEffect, useState } from "react";
import { SUPPORTED_CHAIN_ID } from "utils/network";

export function useAlchemy() {
  const activeChainId = useActiveChainId();
  const [alchemy, setAlchemy] = useState<AlchemyWeb3 | undefined>();

  useEffect(() => {
    if (activeChainId && activeChainId in alchemyUrlMap) {
      setAlchemy(
        createAlchemyWeb3(alchemyUrlMap[activeChainId as SUPPORTED_CHAIN_ID]),
      );
    }
  }, [activeChainId]);

  return { alchemy: alchemy?.alchemy };
}

export type WalletNftData = {
  contractAddress: string;
  tokenId: number;
  tokenType: "erc1155" | "erc721";
  image?: string;
  metadata?: {
    [key: string]: any;
  };
};

export function useWalletNFTs() {
  const { address } = useWeb3();
  const { alchemy } = useAlchemy();

  return useQueryWithNetwork(
    ["walletNfts", address],
    async () => {
      if (!alchemy || !address) {
        return;
      }

      try {
        const data = await alchemy.getNfts({ owner: address });
        const nftData = data.ownedNfts
          .map((nft) => {
            if (!nft.contract.address) {
              return null;
            }

            if ((nft as any).metadata && (nft as any).metadata.image) {
              return {
                contractAddress: nft.contract.address,
                tokenId: parseInt(nft.id.tokenId, 16),
                metadata: (nft as any).metadata,
                image: (nft as any).metadata?.image.replace(
                  "ipfs://",
                  `${process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL}/`,
                ),
                tokenType: nft.id.tokenMetadata?.tokenType,
              };
            } else if ((nft as any).metadata) {
              return {
                contractAddress: nft.contract.address,
                tokenId: parseInt(nft.id.tokenId, 16),
                metadata: (nft as any).metadata,
                tokenType: nft.id.tokenMetadata?.tokenType,
              };
            } else {
              return {
                contractAddress: nft.contract.address,
                tokenId: parseInt(nft.id.tokenId, 16),
                tokenType: nft.id.tokenMetadata?.tokenType,
              };
            }
          })
          .filter((nft) => !!nft);

        return nftData as WalletNftData[];
      } catch (err) {
        console.log("Network not supported");
        throw err;
      }
    },
    {
      enabled: !!alchemy && !!address,
    },
  );
}
