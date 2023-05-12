import { Box, Flex, GridItem, IconButton, SimpleGrid } from "@chakra-ui/react";
import {
  ConnectWallet,
  ThirdwebProvider,
  coinbaseWallet,
  metamaskWallet,
  walletConnectV1,
} from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { CodeSegment } from "components/contract-tabs/code/CodeSegment";
import { CodeEnvironment } from "components/contract-tabs/code/types";
import { ChainIcon } from "components/icons/ChainIcon";
import { PageId } from "page-id";
import React, { useMemo, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { Card, CodeBlock, Heading, Link, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const WALLETS = [
  {
    id: "smart-wallet",
    name: "Smart Wallet",
    description: "Deploy smart contract wallets for your users",
    iconUrl:
      "ipfs://QmeAJVqn17aDNQhjEU3kcWVZCFBrfta8LzaDGkS8Egdiyk/smart-wallet.svg",
    link: "https://portal.thirdweb.com/wallet/smart-wallet",
    supportedLanguages: {
      javascript: `import { LocalWallet, SmartWallet } from "@thirdweb-dev/wallets";
import { Goerli } from "@thirdweb-dev/chains";

// First, connect the personal wallet, which can be any wallet (metamask, walletconnect, etc.)
// Here we're just generating a new local wallet which can be saved later
const personalWallet = new LocalWallet();
await personalWallet.generate();
await personalWallet.connect();

// Setup the Smart Wallet configuration
const config = {
  chain: Goerli, // the chain where your smart wallet will be or is deployed
  factoryAddress: "0x...", // your own deployed account factory address
  thirdwebApiKey: "THIRDWEB_API_KEY", // obtained from the thirdweb dashboard
  gasless: true, // enable or disable gasless transactions
};

// Then, connect the Smart wallet
const wallet = new SmartWallet(config);
await wallet.connect({
  personalWallet,
});`,
      react: `import { ThirdwebProvider, ConnectWallet, smartWallet } from "@thirdweb/react";

export default function App() {
return (
    <ThirdwebProvider supportedWallets={[ smartWallet({ factoryAddress: "0x...", thirdwebApiKey: "THIRDWEB_API_KEY" }) ]}>
      <ConnectWallet theme="{{theme}}" />
    </ThirdwebProvider>
  );
}`,
      "react-native": `import { ThirdwebProvider, ConnectWallet, smartWallet } from "@thirdweb/react-native";

export default function App() {
return (
    <ThirdwebProvider supportedWallets={[ smartWallet() ]}>
      <ConnectWallet theme="{{theme}}" />
    </ThirdwebProvider>
  );
}`,
    },
  },
  {
    id: "local-wallet",
    name: "Local Wallet",
    description: "Generate wallets for new users on the fly",
    iconUrl:
      "ipfs://QmeAJVqn17aDNQhjEU3kcWVZCFBrfta8LzaDGkS8Egdiyk/local-wallet-desktop.svg",
    link: "https://portal.thirdweb.com/wallet/local-wallet",
    supportedLanguages: {
      javascript: `import { LocalWallet } from "@thirdweb-dev/wallets";

const wallet = new LocalWallet();

// generate a random wallet
await wallet.generate();
// connect the wallet to the application
await wallet.connect();

// at any point, you can save the wallet to persistent storage
await wallet.save(config);
// and load it back up
await wallet.load(config);

// you can also export the wallet out of the application
const exportedWallet = await wallet.export(config);
// and import it back in
await wallet.import(exportedWallet, config);`,
      react: `import { ThirdwebProvider, ConnectWallet, localWallet } from "@thirdweb/react";

export default function App() {
return (
    <ThirdwebProvider supportedWallets={[ localWallet() ]}>
      <ConnectWallet theme="{{theme}}" />
    </ThirdwebProvider>
  );
}`,
      "react-native": `import { ThirdwebProvider, ConnectWallet, localWallet } from "@thirdweb/react-native";

export default function App() {
return (
    <ThirdwebProvider supportedWallets={[ localWallet() ]}>
      <ConnectWallet theme="{{theme}}" />
    </ThirdwebProvider>
  );
}`,
      unity: `using UnityEngine;
using Thirdweb;

public class ConnectWalletNativePlatforms : MonoBehaviour
{
    public async void ConnectLocalWalletWithPassword()
    {
        var address = await ThirdwebManager.Instance.SDK.wallet.Connect(new WalletConnection() { password = "myEpicPassword" });
        Debug.Log("Connected successfully to: " + address);
    }
}`,
    },
  },
  {
    id: "coinbase-wallet",
    name: "Coinbase Wallet",
    description: "Connect with Coinbase Wallet",
    iconUrl:
      "ipfs://QmcJBHopbwfJcLqJpX2xEufSS84aLbF7bHavYhaXUcrLaH/coinbase.svg",
    link: "https://portal.thirdweb.com/wallet/coinbase-wallet",
    supportedLanguages: {
      javascript: `import { CoinbaseWallet } from "@thirdweb-dev/wallets";

const wallet = new CoinbaseWallet();

wallet.connect();`,
      react: `import { ThirdwebProvider, ConnectWallet, coinbaseWallet } from "@thirdweb/react";

export default function App() {
return (
    <ThirdwebProvider supportedWallets={[ coinbaseWallet() ]}>
      <ConnectWallet theme="{{theme}}" />
    </ThirdwebProvider>
  );
}`,
      "react-native": `import { ThirdwebProvider, ConnectWallet, coinbaseWallet } from "@thirdweb/react-native";

export default function App() {
return (
    <ThirdwebProvider supportedWallets={[ coinbaseWallet() ]}>
      <ConnectWallet theme="{{theme}}" />
    </ThirdwebProvider>
  );
}`,
      unity: ``,
    },
  },
  {
    id: "metamask",
    name: "MetaMask",
    description: "Connect with MetaMask",
    iconUrl:
      "ipfs://QmZZHcw7zcXursywnLDAyY6Hfxzqop5GKgwoq8NB9jjrkN/metamask.svg",
    link: "https://portal.thirdweb.com/wallet/metamask",
    supportedLanguages: {
      javascript: `import { MetaMaskWallet } from "@thirdweb-dev/wallets";

const wallet = new MetaMaskWallet();

wallet.connect();`,
      react: `import { ThirdwebProvider, ConnectWallet, metamaskWallet } from "@thirdweb/react";

export default function App() {
return (
    <ThirdwebProvider supportedWallets={[ metamaskWallet() ]}>
      <ConnectWallet theme="{{theme}}" />
    </ThirdwebProvider>
  );
}`,
      "react-native": `import { ThirdwebProvider, ConnectWallet, metamaskWallet } from "@thirdweb/react-native";

export default function App() {
return (
    <ThirdwebProvider supportedWallets={[ metamaskWallet() ]}>
      <ConnectWallet theme="{{theme}}" />
    </ThirdwebProvider>
  );
}`,
      unity: ``,
    },
  },
  {
    id: "paper",
    name: "Paper",
    description: "Connect with email via Paper",
    iconUrl:
      "ipfs://QmNrLXtPoFrh4yjZbXui39zUMozS1oetpgU8dvZhFAxfRa/paper-logo-icon.svg",
    link: "https://portal.thirdweb.com/wallet/paper",
    supportedLanguages: {
      javascript: `import { PaperWallet } from "@thirdweb-dev/wallets";
import { Ethereum } from "@thirdweb-dev/chains";

const wallet = new PaperWallet({
  chain: Ethereum, //  chain to connect to
  clientId: "client_id", // Paper SDK client ID
});

wallet.connect();`,
      react: `import { ThirdwebProvider, ConnectWallet, paperWallet } from "@thirdweb/react";

export default function App() {
return (
    <ThirdwebProvider supportedWallets={[ paperWallet({ clientId: "client_id" }) ]}>
      <ConnectWallet theme="{{theme}}" />
    </ThirdwebProvider>
  );
}`,
    },
  },
  /*   {
    id: "ethers",
    name: "Ethers.js",
    description: "Connect any ethers.js compatible wallet",
    iconUrl: "ipfs://QmTWXcv6XnRqwUwEQxWp21oCrXZJ5QomiSTVBjKPQAv92k/ethers.png",
    link: "https://portal.thirdweb.com/wallet",
    supportedLanguages: {
      javascript: ``,
    },
  },
  {
    id: "private-key",
    name: "Private Key",
    description: "Connect a wallet directly by private key",
    iconUrl:
      "ipfs://QmNrycnX15y8EwxDPrwSxnwQgTBWRxUgwSirmhAFoGSod7/private-key.png",
    link: "https://portal.thirdweb.com/wallet",
    supportedLanguages: {
      javascript: ``,
    },
  }, */
  {
    id: "aws-kms",
    name: "AWS KMS",
    description: "Connect with AWS Key Management Service",
    iconUrl:
      "ipfs://QmVuWYpq5CaMfmbB1qMXXgc4dtUUGY31xiG6sxwvNafoZg/aws-kms.png",
    link: "https://portal.thirdweb.com/wallet/aws-kms",
    supportedLanguages: {
      javascript: `import { AwsKmsWallet } from "@thirdweb-dev/wallets/evm/wallets/aws-kms";

const wallet = new AwsKmsWallet({
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
  keyId: process.env.AWS_KEY_ID,
});`,
    },
  },
  {
    id: "aws-secrets-manager",
    name: "AWS Secrets Manager",
    description: "Connect with AWS Secrets Manager",
    iconUrl:
      "ipfs://QmVuWYpq5CaMfmbB1qMXXgc4dtUUGY31xiG6sxwvNafoZg/aws-secrets-manager.png",
    link: "https://portal.thirdweb.com/wallet/aws-secrets-manager",
    supportedLanguages: {
      javascript: `import { AwsSecretsManagerWallet } from "@thirdweb-dev/wallets/evm/wallets/aws-secrets-manager";

const wallet = new AwsSecretsManagerWallet({
  secretId: "{{secret-id}}", // ID of the secret value
  secretKeyName: "{{secret-key-name}}", // Name of the secret value
  awsConfig: {
    region: "us-east-1", // Region where your secret is stored
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Add environment variables to store your AWS credentials
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Add environment variables to store your AWS credentials
    },
  },
});`,
    },
  },
  {
    id: "wallet-connect",
    name: "WalletConnect",
    description: "Connect with WalletConnect (v1 & v2)",
    iconUrl:
      "ipfs://QmX58KPRaTC9JYZ7KriuBzeoEaV2P9eZcA3qbFnTHZazKw/wallet-connect.svg",
    link: "https://portal.thirdweb.com/wallet/wallet-connect-v1",
    supportedLanguages: {
      javascript: `import { WalletConnect } from "@thirdweb-dev/wallets";

const wallet = new WalletConnect();

wallet.connect();`,
      react: `import { ThirdwebProvider, ConnectWallet, walletConnect } from "@thirdweb/react";

export default function App() {
return (
    <ThirdwebProvider supportedWallets={[ walletConnect() ]}>
      <ConnectWallet theme="{{theme}}" />
    </ThirdwebProvider>
  );
}`,
      "react-native": `import { ThirdwebProvider, ConnectWallet, walletConnect } from "@thirdweb/react-native";

export default function App() {
return (
    <ThirdwebProvider supportedWallets={[ walletConnect() ]}>
      <ConnectWallet theme="{{theme}}" />
    </ThirdwebProvider>
  );
}`,
      unity: `using UnityEngine;
using Thirdweb;

public class ConnectWalletNativePlatforms : MonoBehaviour
{
    public async void ConnectWalletConnect()
    {
        var address = await ThirdwebManager.Instance.SDK.wallet.Connect(new WalletConnection() { provider = WalletProvider.WalletConnect });
        Debug.Log("Connected successfully to: " + address);
    }
}`,
    },
  },
  {
    id: "safe-wallet",
    name: "Safe",
    description: "Connect to multi-sig wallets via Safe",
    iconUrl:
      "ipfs://QmbbyxDDmmLQh8DzzeUR6X6B75bESsNUFmbdvS3ZsQ2pN1/SafeToken.svg",
    link: "https://portal.thirdweb.com/wallet/safe",
    supportedLanguages: {
      javascript: `import { CoinbaseWallet, SafeWallet } from "@thirdweb-dev/wallets";
import { Ethereum } from "@thirdweb-dev/chains";

// First, connect the personal wallet
const personalWallet = new CoinbaseWallet();
await personalWallet.connect();

// Then, connect the Safe wallet
const wallet = new SafeWallet();
await wallet.connect({
  personalWallet: personalWallet,
  chain: Ethereum,
  safeAddress: "{{contract_address}}",
});`,
      react: `import { ThirdwebProvider, ConnectWallet, safeWallet } from "@thirdweb/react";

export default function App() {
return (
    <ThirdwebProvider supportedWallets={[ safeWallet() ]}>
      <ConnectWallet theme="{{theme}}" />
    </ThirdwebProvider>
  );
}`,
    },
  },
  {
    id: "magic-link",
    name: "Magic Link",
    description: "Connect with email or phone number via Magic",
    iconUrl:
      "ipfs://QmUMBFZGXxBpgDmZzZAHhbcCL5nYvZnVaYLTajsNjLcxMU/1-Icon_Magic_Color.svg",
    link: "https://portal.thirdweb.com/wallet/magic",
    supportedLanguages: {
      javascript: `import { MagicLink } from "@thirdweb-dev/wallets";

// create a wallet instance
const wallet = new MagicLink({
  apiKey: "YOUR_API_KEY",
});

// now connect using email or phone number

wallet.connect({
  email: "user@example.com",
});

// OR

wallet.connect({
  phoneNumber: "+123456789",
});`,
      react: `import { ThirdwebProvider, ConnectWallet, magicLink } from "@thirdweb/react";

export default function App() {
return (
    <ThirdwebProvider supportedWallets={[ magicLink({ apiKey: "YOUR_API_KEY" }) ]}>
      <ConnectWallet theme="{{theme}}" />
    </ThirdwebProvider>
  );
}`,
      unity: ``,
    },
  },
] as const;

interface SupportedWalletsSelectorProps {
  selectedLanguage: CodeEnvironment;
  selectedWallet: (typeof WALLETS)[number] | null;
  setSelectedWallet: (wallet: (typeof WALLETS)[number]) => void;
}

const SupportedWalletsSelector: React.FC<SupportedWalletsSelectorProps> = ({
  selectedLanguage,
  selectedWallet,
  setSelectedWallet,
}) => {
  const sortedWallets = useMemo(() => {
    // sort by language being supported or not
    const supportedWallets = WALLETS.filter(
      (wallet) =>
        selectedLanguage in wallet.supportedLanguages &&
        wallet.supportedLanguages[
          selectedLanguage as keyof typeof wallet.supportedLanguages
        ],
    );
    const unsupportedWallets = WALLETS.filter(
      (wallet) =>
        !(selectedLanguage in wallet.supportedLanguages) &&
        !wallet.supportedLanguages[
          selectedLanguage as keyof typeof wallet.supportedLanguages
        ],
    );
    return [
      ...supportedWallets,
      ...unsupportedWallets.map((w) => ({ ...w, _isUnsupported: true })),
    ];
  }, [selectedLanguage]);

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
      {sortedWallets.map((wallet) => {
        const isWalletSupported = !("_isUnsupported" in wallet);
        return (
          <Card
            key={wallet.id}
            onClick={
              isWalletSupported ? () => setSelectedWallet(wallet) : undefined
            }
            as={Flex}
            flexDir="column"
            gap={3}
            p={6}
            _hover={isWalletSupported ? { borderColor: "blue.500" } : {}}
            position="relative"
            cursor={isWalletSupported ? "pointer" : "not-allowed"}
            borderColor={
              wallet.id === selectedWallet?.id ? "blue.500" : "borderColor"
            }
            overflow="hidden"
          >
            <Box opacity={isWalletSupported ? 1 : 0.3}>
              <Flex justifyContent="space-between">
                <Flex alignItems="center" gap={3}>
                  <ChainIcon size={25} ipfsSrc={wallet.iconUrl} />

                  <Heading size="subtitle.sm" as="h3" noOfLines={1}>
                    {wallet.name}
                  </Heading>
                </Flex>
              </Flex>
              <Flex>
                <Flex flexDir="column" gap={1} w="full">
                  <Text opacity={0.6}>{wallet.description}</Text>
                </Flex>
              </Flex>
            </Box>
            {!isWalletSupported && (
              <SimpleGrid
                placeItems="center"
                position="absolute"
                top={0}
                bottom={0}
                right={0}
                left={0}
                backdropFilter="blur(3px)"
                zIndex={1}
              >
                <Heading as="p" size="label.sm">
                  Not yet supported in{" "}
                  <Box as="span" textTransform="capitalize">
                    {selectedLanguage === "react-native"
                      ? "React Native"
                      : selectedLanguage === "javascript"
                      ? "JavaScript"
                      : selectedLanguage}
                  </Box>
                </Heading>
              </SimpleGrid>
            )}
          </Card>
        );
      })}
    </SimpleGrid>
  );
};

const DashboardWallets: ThirdwebNextPage = () => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<CodeEnvironment>("javascript");

  const [selectedWallet, setSelectedWallet] = useState<
    (typeof WALLETS)[number] | null
  >(null);

  const onLanguageSelect = (language: CodeEnvironment) => {
    if (
      selectedWallet &&
      !(language in selectedWallet.supportedLanguages) &&
      !selectedWallet.supportedLanguages[
        language as keyof typeof selectedWallet.supportedLanguages
      ]
    ) {
      setSelectedWallet(null);
    }
    setSelectedLanguage(language);
  };

  return (
    <Flex flexDir="column" gap={12} mt={{ base: 2, md: 6 }}>
      <Flex direction="column" gap={2}>
        <Flex
          justifyContent="space-between"
          direction={{ base: "column", md: "row" }}
          gap={4}
        >
          <Heading size="title.lg" as="h1">
            Wallet SDK
          </Heading>
        </Flex>
        <Text>
          Simplified wallet connection to your app, game or backend using a{" "}
          <Link
            href="https://portal.thirdweb.com/wallet"
            color="blue.400"
            isExternal
          >
            universal wallet interface
          </Link>
          .
        </Text>
      </Flex>

      <Flex direction="column" gap={4}>
        <Heading size="subtitle.sm" as="h3">
          Step 1: Pick a language to get started
        </Heading>
        {/* Rendering the code snippet for WalletConnect since it supports all languages */}
        <CodeSegment
          snippet={
            WALLETS.find((w) => w.id === "wallet-connect")
              ?.supportedLanguages || {}
          }
          environment={selectedLanguage}
          setEnvironment={onLanguageSelect}
          onlyTabs
        />
      </Flex>

      <Flex direction="column" gap={4}>
        <Heading size="subtitle.sm" as="h3">
          Step 2: Pick a supported wallet
        </Heading>
        <SupportedWalletsSelector
          selectedLanguage={selectedLanguage}
          selectedWallet={selectedWallet}
          setSelectedWallet={setSelectedWallet}
        />
      </Flex>

      {selectedWallet?.id === "smart-wallet" && (
        <Flex direction="column" gap={4}>
          <Heading size="subtitle.sm" as="h3">
            Step 3: Getting started with Smart Wallet
          </Heading>
          <Flex flexDir="column">
            <Text>
              1. Deploy a smart wallet factory contract, you can deploy one in
              1-click via the{" "}
              <Link href="/explore/smart-wallet" isExternal color="blue.500">
                explore page
              </Link>
              .
            </Text>
            <Text>
              2.{" "}
              <Link href="/dashboard/api-keys" isExternal color="blue.500">
                Get an API key
              </Link>{" "}
              to access thirdweb&apos;s bundler and paymaster infrastructure,
              which is required for the smart wallet to operate and optionally
              enable gasless transactions.
            </Text>
          </Flex>
        </Flex>
      )}

      {selectedWallet?.supportedLanguages[
        selectedLanguage as keyof typeof selectedWallet.supportedLanguages
      ] && (
        <Flex direction="column" gap={4}>
          <Heading size="subtitle.sm" as="h3">
            Step {selectedWallet?.id === "smart-wallet" ? "4" : "3"}: Integrate
            into your app
          </Heading>
          <Text>
            Learn more about {selectedWallet.name} integration in{" "}
            <Link href={selectedWallet.link} isExternal color="blue.500">
              our docs
            </Link>
            .
          </Text>
          {selectedLanguage === "react" ? (
            <ConnectWalletWithPreview
              code={
                selectedWallet.supportedLanguages[
                  "react" as keyof typeof selectedWallet.supportedLanguages
                ]
              }
            />
          ) : (
            <CodeSegment
              snippet={selectedWallet.supportedLanguages}
              environment={selectedLanguage}
              setEnvironment={setSelectedLanguage}
              hideTabs
            />
          )}
        </Flex>
      )}
    </Flex>
  );
};

DashboardWallets.getLayout = (page, props) => (
  <AppLayout {...props}>{page}</AppLayout>
);

DashboardWallets.pageId = PageId.DashboardWallets;

export default DashboardWallets;

interface ConnectWalletWithPreviewProps {
  code: string;
}

const ConnectWalletWithPreview: React.FC<ConnectWalletWithPreviewProps> = ({
  code,
}) => {
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">("light");
  return (
    <SimpleGrid columns={{ base: 6, md: 12 }} gap={8} mt={8}>
      <GridItem colSpan={7}>
        <Flex direction="column" gap={2}>
          <Heading size="label.md">Code</Heading>
          <CodeBlock
            language="jsx"
            code={code.replace("{{theme}}", selectedTheme)}
          />
        </Flex>
      </GridItem>
      <GridItem colSpan={5} gap={2}>
        <Flex gap={2} direction="column" align="flex-start" h="full">
          <Heading size="label.md">Preview</Heading>
          <Box w="full" my="auto" display="grid" placeItems="center">
            <ThirdwebProvider
              supportedWallets={[
                metamaskWallet(),
                coinbaseWallet(),
                walletConnectV1(),
              ]}
            >
              <ConnectWallet
                theme={selectedTheme}
                // overrides
                auth={{ loginOptional: true }}
              />
            </ThirdwebProvider>
          </Box>
          <Flex>
            <IconButton
              size="sm"
              onClick={() => {
                setSelectedTheme(selectedTheme === "light" ? "dark" : "light");
              }}
              icon={selectedTheme === "light" ? <FiMoon /> : <FiSun />}
              aria-label="Toggle button theme"
              variant="ghost"
            />
          </Flex>
        </Flex>
      </GridItem>
    </SimpleGrid>
  );
};
