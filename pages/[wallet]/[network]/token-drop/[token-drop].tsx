import {
  useTokenDropContractMetadata,
  useTokenDropData,
} from "@3rdweb-sdk/react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { useTokenDrop } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { ContractLayout } from "components/contract-pages/contract-layout";
import { TransferModal } from "components/currency/TransferModal";
import { BigNumber } from "ethers";
import { useTrack } from "hooks/analytics/useTrack";
import { useSingleQueryParam } from "hooks/useQueryParam";
import React, { ReactElement } from "react";
import { FiSend } from "react-icons/fi";
import { Button, Card } from "tw-components";

export default function TokenDropPage() {
  const tokenDropAddress = useSingleQueryParam("token-drop");
  const contract = useTokenDrop(tokenDropAddress);
  const metadata = useTokenDropContractMetadata(tokenDropAddress);
  const data = useTokenDropData(tokenDropAddress);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { Track } = useTrack({
    page: "tokenDrop",
    tokenDrop: tokenDropAddress,
  });

  return (
    <Track>
      <TransferModal isOpen={isOpen} onClose={onClose} />
      <ContractLayout
        contract={contract}
        metadata={metadata}
        data={data}
        primaryAction={
          data.data?.ownedBalance &&
          data.data?.ownedBalance !== true &&
          BigNumber.from(data.data?.ownedBalance.value).gt(0) ? (
            <Button
              colorScheme="primary"
              variant="outline"
              onClick={onOpen}
              rightIcon={<FiSend />}
            >
              Transfer
            </Button>
          ) : undefined
        }
      >
        <Stack spacing={6}>
          <Stack direction="row" spacing={6}>
            <Card as={Stat}>
              <StatLabel>Total Supply</StatLabel>
              <StatNumber>{data.data?.totalSupply?.displayValue}</StatNumber>
            </Card>
            <Card as={Stat}>
              <StatLabel>Owned by you</StatLabel>
              <StatNumber>
                {data.data?.ownedBalance === false
                  ? "N/A"
                  : data.data?.ownedBalance && data.data?.ownedBalance !== true
                  ? `${data.data.ownedBalance.displayValue} ${data.data?.symbol}`
                  : `0 ${data.data?.symbol}`}
              </StatNumber>
              {data.data?.ownedBalance === false && (
                <StatHelpText>
                  Connect your wallet to see your balance
                </StatHelpText>
              )}
            </Card>
            <Card as={Stat}>
              <StatLabel>Decimals</StatLabel>
              <StatNumber>{data.data?.decimals}</StatNumber>
            </Card>
          </Stack>
        </Stack>
      </ContractLayout>
    </Track>
  );
}

TokenDropPage.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;
