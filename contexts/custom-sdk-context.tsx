import { useQueryClient } from "@tanstack/react-query";
import { ThirdwebSDKProvider, useSigner } from "@thirdweb-dev/react";
import type { SDKOptions } from "@thirdweb-dev/sdk/evm";
import { DASHBOARD_THIRDWEB_API_KEY } from "constants/rpc";
import {
  useSupportedChain,
  useSupportedChains,
} from "hooks/chains/configureChains";
import { getDashboardChainRpc } from "lib/rpc";
import { StorageSingleton } from "lib/sdk";
import { ComponentWithChildren } from "types/component-with-children";

export const CustomSDKContext: ComponentWithChildren<{
  desiredChainId?: number;
  options?: SDKOptions;
}> = ({ desiredChainId, options, children }) => {
  const signer = useSigner();
  const queryClient = useQueryClient();
  const networkInfo = useSupportedChain(desiredChainId || -1);
  const configuredChains = useSupportedChains();

  return (
    <ThirdwebSDKProvider
      activeChain={desiredChainId}
      signer={signer}
      queryClient={queryClient}
      supportedChains={configuredChains}
      sdkOptions={{
        gasSettings: {
          maxPriceInGwei: 650,
        },
        readonlySettings: networkInfo
          ? {
              chainId: desiredChainId,
              rpcUrl: getDashboardChainRpc(networkInfo),
            }
          : undefined,
        ...options,
      }}
      thirdwebApiKey={DASHBOARD_THIRDWEB_API_KEY}
      storageInterface={StorageSingleton}
    >
      {children}
    </ThirdwebSDKProvider>
  );
};

export const PublisherSDKContext: ComponentWithChildren = ({ children }) => (
  <CustomSDKContext
    // polygon = 137
    desiredChainId={137}
    options={{
      gasless: {
        openzeppelin: {
          relayerUrl:
            "https://api.defender.openzeppelin.com/autotasks/dad61716-3624-46c9-874f-0e73f15f04d5/runs/webhook/7d6a1834-dd33-4b7b-8af4-b6b4719a0b97/FdHMqyF3p6MGHw6K2nkLsv",
          relayerForwarderAddress: "0xEbc1977d1aC2fe1F6DAaF584E2957F7c436fcdEF",
        },
        experimentalChainlessSupport: true,
      },
    }}
  >
    {children}
  </CustomSDKContext>
);
