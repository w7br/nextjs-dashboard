import { HoverMenu } from "./HoverMenu";
import { NavCardProps } from "./NavCard";
import { Flex, Icon, Stack } from "@chakra-ui/react";
import { SiDiscord } from "@react-icons/all-files/si/SiDiscord";
import { SiGithub } from "@react-icons/all-files/si/SiGithub";
import { SiTwitter } from "@react-icons/all-files/si/SiTwitter";
import { SiYoutube } from "@react-icons/all-files/si/SiYoutube";
import { FiShoppingCart } from "react-icons/fi";
import { IoGameControllerOutline } from "react-icons/io5";
import { TfiStamp } from "react-icons/tfi";
import { LinkButton, TrackedIconButton, TrackedLink } from "tw-components";

export const DesktopMenu: React.FC = () => {
  return (
    <Flex gap={8}>
      <Stack
        display={["none", "none", "flex"]}
        direction="row"
        alignItems="center"
        color="gray.50"
        fontWeight="bold"
        spacing={10}
        as="nav"
      >
        <HoverMenu title="Products" items={PRODUCTS} columns={2} />
        <HoverMenu title="Solutions" items={SOLUTIONS} />
        <HoverMenu title="Resources" items={RESOURCES} />
        <TrackedLink
          fontWeight={400}
          isExternal
          href="https://portal.thirdweb.com"
          category="landing-page"
          label="docs"
          _hover={{
            textDecor: "none",
          }}
        >
          Docs
        </TrackedLink>
      </Stack>

      <Flex
        display={{ base: "none", md: "flex" }}
        direction="row"
        align="center"
      >
        <TrackedIconButton
          as={LinkButton}
          isExternal
          noIcon
          href="https://twitter.com/thirdweb"
          color="gray.50"
          bg="transparent"
          aria-label="twitter"
          icon={<Icon boxSize="1rem" as={SiTwitter} />}
          category="topnav"
          label="twitter"
        />
        <TrackedIconButton
          as={LinkButton}
          isExternal
          noIcon
          href="https://discord.gg/thirdweb"
          bg="transparent"
          color="gray.50"
          aria-label="discord"
          icon={<Icon boxSize="1rem" as={SiDiscord} />}
          category="topnav"
          label="discord"
        />
        <TrackedIconButton
          as={LinkButton}
          isExternal
          noIcon
          href="https://github.com/thirdweb-dev"
          bg="transparent"
          color="gray.50"
          aria-label="discord"
          icon={<Icon boxSize="1rem" as={SiGithub} />}
          category="topnav"
          label="github"
        />
        <TrackedIconButton
          as={LinkButton}
          isExternal
          noIcon
          href="https://www.youtube.com/channel/UCdzMx7Zhy5va5End1-XJFbA"
          bg="transparent"
          color="gray.50"
          aria-label="YouTube"
          icon={<Icon boxSize="1rem" as={SiYoutube} />}
          category="topnav"
          label="youtube"
        />
      </Flex>
    </Flex>
  );
};

export const PRODUCTS: NavCardProps[] = [
  {
    name: "SDKs",
    label: "sdk",
    description: "Integrate web3 into your app",
    link: "/sdk",
    icon: require("public/assets/product-icons/sdks.png"),
  },
  {
    name: "Auth",
    label: "auth",
    description: "Authenticate users with their wallets",
    link: "/auth",
    icon: require("public/assets/product-icons/auth.png"),
  },
  {
    name: "Explore",
    label: "explore",
    description: "Ready-to-deploy contracts",
    link: "/smart-contracts",
    icon: require("public/assets/product-icons/contracts.png"),
  },
  {
    name: "Publish",
    label: "publish",
    description: "Publish your contracts on-chain",
    link: "/publish",
    icon: require("public/assets/product-icons/publish.png"),
  },
  {
    name: "Solidity SDK",
    label: "contractkit",
    description: "Build your own contract easily",
    link: "/solidity-sdk",
    icon: require("public/assets/product-icons/extensions.png"),
  },
  {
    name: "Deploy",
    label: "deploy",
    description: "Seamless contract deployment for teams",
    link: "/deploy",
    icon: require("public/assets/product-icons/deploy.png"),
  },
  {
    name: "Dashboards",
    label: "dashboards",
    description: "Manage and analyze contract activity",
    link: "/dashboards",
    icon: require("public/assets/product-icons/dashboards.png"),
  },
  {
    name: "Storage",
    label: "storage",
    description: "Secure, fast, decentralized storage",
    link: "/storage",
    icon: require("public/assets/product-icons/storage.png"),
  },
  {
    name: "UI Components",
    label: "ui-components",
    description: "Plug-and-play frontend components",
    link: "/ui-components",
    icon: require("public/assets/product-icons/ui-components.png"),
  },
  {
    name: "Wallet SDK",
    label: "wallet-sdk",
    description: "Connect any wallet",
    link: "/wallet-sdk",
    icon: require("public/assets/product-icons/wallet-sdk.png"),
  },
];

export const SOLUTIONS: NavCardProps[] = [
  {
    name: "CommerceKit",
    label: "commerce",
    description: "Integrate web3 into commerce apps",
    link: "/solutions/commerce",
    iconType: FiShoppingCart,
  },
  {
    name: "GamingKit",
    label: "gaming",
    description: "Integrate web3 into games",
    link: "/solutions/gaming",
    iconType: IoGameControllerOutline,
  },
  {
    name: "Minting",
    label: "minting",
    description: "Build and mint NFTs at scale easily",
    link: "/solutions/minting",
    iconType: TfiStamp,
  },
];

export const RESOURCES: NavCardProps[] = [
  {
    name: "About",
    label: "about",
    description: "Learn more about our company",
    link: "/about",
    icon: require("public/assets/tw-icons/general.png"),
  },
  {
    name: "Open Source",
    label: "open-source",
    description: "Learn how to contribute to thirdweb",
    link: "/open-source",
    icon: require("public/assets/tw-icons/advanced-nfts.png"),
  },
  {
    name: "Docs",
    label: "docs",
    description: "Complete thirdweb documentation",
    link: "https://portal.thirdweb.com",
    icon: require("public/assets/tw-icons/pack.png"),
  },
  {
    name: "Guides",
    label: "guides",
    description: "Learn how to build with thirdweb",
    link: "https://blog.thirdweb.com/guides",
    icon: require("public/assets/tw-icons/edition.png"),
  },
  {
    name: "Blog",
    label: "blog",
    description: "Our latest news and updates",
    link: "https://blog.thirdweb.com",
    icon: require("public/assets/tw-icons/datastore.png"),
  },
];
