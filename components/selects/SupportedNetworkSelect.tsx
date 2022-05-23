import { useWeb3 } from "@3rdweb-sdk/react";
import { Select, SelectProps, forwardRef } from "@chakra-ui/react";
import { useMemo } from "react";
import { ChainId, SUPPORTED_CHAIN_IDS } from "utils/network";

export interface SupportedNetworkSelectProps
  extends Omit<SelectProps, "children"> {
  disabledChainIds?: ChainId[];
  disabledChainIdText?: string;
}

export const SupportedNetworkSelect = forwardRef<
  SupportedNetworkSelectProps,
  "select"
>(
  (
    { disabledChainIds, disabledChainIdText = "unsupported", ...selectProps },
    ref,
  ) => {
    const { getNetworkMetadata } = useWeb3();
    const testnets = useMemo(() => {
      return SUPPORTED_CHAIN_IDS.map((supportedChain) => {
        return getNetworkMetadata(supportedChain);
      }).filter((n) => n.isTestnet);
    }, [getNetworkMetadata]);

    const mainnets = useMemo(() => {
      return SUPPORTED_CHAIN_IDS.map((supportedChain) => {
        return getNetworkMetadata(supportedChain);
      }).filter((n) => !n.isTestnet);
    }, [getNetworkMetadata]);
    return (
      <Select {...selectProps} ref={ref}>
        <option disabled value={-1}>
          Select Network
        </option>
        <optgroup label="Mainnets">
          {mainnets.map((mn) => (
            <option
              key={mn.chainId}
              value={mn.chainId}
              disabled={disabledChainIds?.includes(mn.chainId)}
            >
              {mn.chainName} ({mn.symbol})
              {disabledChainIds?.includes(mn.chainId)
                ? ` - ${disabledChainIdText}`
                : ""}
            </option>
          ))}
        </optgroup>
        <optgroup label="Testnets">
          {testnets.map((tn) => (
            <option
              key={tn.chainId}
              value={tn.chainId}
              disabled={disabledChainIds?.includes(tn.chainId)}
            >
              {tn.chainName} ({tn.symbol})
              {disabledChainIds?.includes(tn.chainId)
                ? ` - ${disabledChainIdText}`
                : ""}
            </option>
          ))}
        </optgroup>
      </Select>
    );
  },
);
