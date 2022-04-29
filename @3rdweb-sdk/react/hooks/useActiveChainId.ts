import { useSingleQueryParam } from "hooks/useQueryParam";
import {
  SUPPORTED_CHAIN_ID,
  SupportedNetwork,
  getChainIdFromNetwork,
  getNetworkFromChainId,
} from "utils/network";

export function useActiveChainId(): SUPPORTED_CHAIN_ID | undefined {
  const networkFromUrl = useSingleQueryParam<SupportedNetwork>("network");
  return getChainIdFromNetwork(networkFromUrl);
}

export function useActiveNetwork(): SupportedNetwork | undefined {
  const activeChainId = useActiveChainId();
  return activeChainId && getNetworkFromChainId(activeChainId);
}
