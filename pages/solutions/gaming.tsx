import {
  AspectRatio,
  Box,
  Container,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { SDKSection } from "components/homepage/sections/SDKSection";
import { GameShowcase } from "components/product-pages/common/GameShowcase";
import { GuidesShowcase } from "components/product-pages/common/GuideShowcase";
import { Hero } from "components/product-pages/common/Hero";
import { ProductCard } from "components/product-pages/common/ProductCard";
import { ProductLearnMoreCard } from "components/product-pages/common/ProductLearnMoreCard";
import { ProductPage } from "components/product-pages/common/ProductPage";
import { ProductSection } from "components/product-pages/common/ProductSection";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import { CatAttackCard } from "pages/build/base";
import { Heading, TrackedLink } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const TRACKING_CATEGORY = "gaming_kit";

const GAMING_GUIDES = [
  {
    title: "Get Started with the Unity SDK",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/11/Group-625859--1-.png",
    link: "https://blog.thirdweb.com/guides/get-started-with-thirdwebs-unity-sdk/",
  },
  {
    title: "Build A Native Web3 Game (iOS, Android, Windows, Mac)",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2023/03/Sell-An-ERC20-Token-As-In-Game-Currency-In-A-Unity-Game.png",
    link: "https://blog.thirdweb.com/guides/how-to-build-a-web3-game/",
  },
  {
    title: "Set up Coinbase Pay in your Unity Project",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/12/Coinbase-Pay-guide.png",
    link: "https://blog.thirdweb.com/guides/set-up-coinbase-pay-in-your-unity-project/",
  },
];

const GAMING_CASE_STUDIES = [
  {
    title: "Pixels Builds an On-Chain Ecosystem for its Open-World Web3 Game",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2023/04/Pixels-Builds-an-Onchain-Ecosystem-for-its-Web3-Game-thirdweb-Case-Study.png",
    link: "https://blog.thirdweb.com/case-studies/pixels-builds-an-onchain-ecosystem-for-its-web3-game/",
  },
  {
    title: "Fractal, Web3 Gaming Platform and Marketplace for Blockchain Games",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/11/Fractal.png",
    link: "https://blog.thirdweb.com/fractal-web3-gaming-platform-and-marketplace-for-blockchain-games-expands-to-evm-chains/",
  },
  {
    title:
      "Dreamworks Launches NFT Avatars for the Metaverse in Collaboration with Gala's VOX",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/10/DreamWorks-Launches-NFT-Avatars-with-Gala-s-VOX---thirdweb-Case-Study-2.png",
    link: "https://blog.thirdweb.com/dreamworks-launches-nft-avatars-for-web3-games-with-gala-and-the-sims-creators-voxverse/",
  },
];

const Gaming: ThirdwebNextPage = () => {
  return (
    <ProductPage
      accentColor="rgba(22,82,240,.75)"
      seo={{
        title:
          "thirdweb GamingKit | SDKs, Smart Contracts & Dev Tools for Web3 Games",
        description:
          "Build web3 games with our Unity SDK for all supported platforms, including: Native, Mobile, Console, Browser, and VR.",
        openGraph: {
          images: [
            {
              url: `${getAbsoluteUrl()}/thirdwebxcoinbase.png`,
              width: 1200,
              height: 630,
              alt: "thirdweb x coinbase",
            },
          ],
        },
      }}
    >
      <Hero
        name="GamingKit"
        title="Build web3 games on any platform"
        description={
          <>
            Build web3 games with our{" "}
            <TrackedLink
              fontWeight={700}
              category={TRACKING_CATEGORY}
              href="https://portal.thirdweb.com/unity"
              label="unity SDK"
              isExternal
            >
              Unity SDK
            </TrackedLink>{" "}
            for all supported platforms, including: Native, Mobile, Console,
            Browser, and VR.
          </>
        }
        buttonText="Get started"
        buttonLink="https://portal.thirdweb.com/gamingkit"
        gradient="linear-gradient(145.96deg, rgba(205, 0, 238, 1) 5.07%, #1652F0 100%)"
        image={require("public/assets/solutions-pages/gaming/hero.png")}
        type="Solutions"
        trackingCategory={TRACKING_CATEGORY}
        underGetStarted={
          <Flex gap={2} justify="center" align="center">
            <Heading size="subtitle.xs" as="span" mt={1}>
              In partnership with
            </Heading>
            <AspectRatio w="80px" ratio={359 / 64}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="359"
                height="64"
                fill="none"
                viewBox="0 0 359 64"
              >
                <g clipPath="url(#clip0)">
                  <path
                    fill="#fff"
                    d="M72.3094 17.8676C59.2941 17.8676 49.1245 27.7478 49.1245 40.9744C49.1245 54.2011 59.0371 63.9967 72.3094 63.9967C85.5816 63.9967 95.6666 54.032 95.6666 40.8899C95.6666 27.8323 85.754 17.8676 72.3094 17.8676ZM72.3972 54.4646C64.9854 54.4646 59.5542 48.7082 59.5542 40.9777C59.5542 33.1594 64.8976 27.4063 72.3094 27.4063C79.8089 27.4063 85.2369 33.2472 85.2369 40.9777C85.2369 48.7082 79.8089 54.4646 72.3972 54.4646ZM98.5091 27.9201H104.974V63.1414H115.316V18.7262H98.5091V27.9201ZM23.0971 27.403C28.5283 27.403 32.8374 30.7528 34.4733 35.7351H45.4202C43.4364 25.0842 34.6457 17.8676 23.1849 17.8676C10.1696 17.8676 0 27.7478 0 40.9777C0 54.2076 9.9127 64 23.1849 64C34.3887 64 43.3518 56.7834 45.3356 46.0446H34.4733C32.922 51.027 28.6128 54.4646 23.1817 54.4646C15.6821 54.4646 10.4265 48.7082 10.4265 40.9777C10.4298 33.1594 15.6008 27.403 23.0971 27.403ZM295.013 36.6815L287.429 35.566C283.81 35.0522 281.224 33.8489 281.224 31.013C281.224 27.9201 284.587 26.3753 289.153 26.3753C294.152 26.3753 297.342 28.5218 298.031 32.0439H308.029C306.907 23.1101 300.012 17.8708 289.413 17.8708C278.466 17.8708 271.227 23.4549 271.227 31.3577C271.227 38.9158 275.968 43.2998 285.533 44.6722L293.117 45.7877C296.825 46.3015 298.893 47.765 298.893 50.5131C298.893 54.0353 295.274 55.4955 290.275 55.4955C284.154 55.4955 280.707 53.0043 280.19 49.2253H270.02C270.97 57.9021 277.777 64 290.187 64C301.479 64 308.975 58.8453 308.975 49.996C308.975 42.0932 303.547 37.9694 295.013 36.6815ZM110.145 0.42929C106.353 0.42929 103.508 3.1774 103.508 6.95645C103.508 10.7355 106.35 13.4836 110.145 13.4836C113.937 13.4836 116.783 10.7355 116.783 6.95645C116.783 3.1774 113.937 0.42929 110.145 0.42929ZM261.919 33.9334C261.919 24.3134 256.059 17.8708 243.648 17.8708C231.927 17.8708 225.377 23.7996 224.083 32.9057H234.34C234.857 29.3836 237.615 26.4631 243.476 26.4631C248.735 26.4631 251.32 28.7819 251.32 31.6179C251.32 35.3124 246.578 36.2555 240.718 36.8572C232.789 37.7157 222.964 40.4638 222.964 50.7733C222.964 58.764 228.912 63.9154 238.393 63.9154C245.804 63.9154 250.458 60.8226 252.787 55.9248C253.132 60.3055 256.407 63.1414 260.976 63.1414H267.009V53.9507H261.922V33.9334H261.919ZM251.749 45.1015C251.749 51.0302 246.578 55.4109 240.285 55.4109C236.406 55.4109 233.131 53.7783 233.131 50.344C233.131 45.9633 238.389 44.76 243.216 44.2462C247.87 43.8169 250.455 42.7859 251.749 40.8086V45.1015ZM196.849 17.8676C191.073 17.8676 186.247 20.2742 182.8 24.3102V0H172.458V63.1414H182.627V57.3005C186.074 61.5088 190.989 64 196.849 64C209.259 64 218.655 54.2076 218.655 40.9777C218.655 27.7478 209.087 17.8676 196.849 17.8676ZM195.298 54.4646C187.886 54.4646 182.455 48.7082 182.455 40.9777C182.455 33.2472 187.971 27.4063 195.382 27.4063C202.882 27.4063 208.137 33.1627 208.137 40.9777C208.137 48.7082 202.709 54.4646 195.298 54.4646ZM147.721 17.8676C140.999 17.8676 136.602 20.6157 134.017 24.4825V18.7262H123.759V63.1382H134.101V39.0004C134.101 32.213 138.41 27.403 144.788 27.403C150.736 27.403 154.44 31.6114 154.44 37.7125V63.1414H164.782V36.9417C164.786 25.7704 159.013 17.8676 147.721 17.8676ZM358.275 39.5175C358.275 26.8046 348.967 17.8708 336.469 17.8708C323.197 17.8708 313.457 27.8356 313.457 40.9777C313.457 54.8093 323.886 64 336.642 64C347.416 64 355.862 57.642 358.015 48.6236H347.24C345.689 52.575 341.897 54.8093 336.811 54.8093C330.173 54.8093 325.174 50.6855 324.055 43.4689H358.272V39.5175H358.275ZM324.66 36.0799C326.3 29.8942 330.953 26.8892 336.297 26.8892C342.157 26.8892 346.639 30.2389 347.673 36.0799H324.66Z"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="358.275" height="64" fill="#fff" />
                  </clipPath>
                </defs>
              </svg>
            </AspectRatio>
          </Flex>
        }
        secondaryButton={{
          text: "Request demo",
          link: "https://thirdweb.typeform.com/tw-solutions",
        }}
      >
        <SimpleGrid
          justifyContent="flex-start"
          w="100%"
          columns={{ base: 1, md: 3 }}
          gap={{ base: 12, md: 6 }}
        >
          <ProductCard
            title="Monetize with in-game asset sales"
            icon={require("/public/assets/product-pages/extensions/hero-icon-1.png")}
          >
            Get additional revenue streams with primary sales and royalty fees
            from secondary sales for in-game assets represented as NFTs.
          </ProductCard>
          <ProductCard
            title="Build web3 games faster"
            icon={require("/public/assets/product-pages/extensions/hero-icon-2.png")}
          >
            <span>
              Our SDKs detect <strong>extensions</strong> in contracts to handle
              all common contract operations for devs without the need for
              boiler plate.
            </span>
          </ProductCard>
          <ProductCard
            title="Frictionless web3 experience for players"
            icon={require("/public/assets/product-pages/extensions/hero-icon-3.png")}
          >
            <span>
              Generate wallets for players on the back-end. Remove the need for
              disruptive transaction pop-ups entirely with{" "}
              <strong>Device Wallet</strong>.
            </span>
          </ProductCard>
        </SimpleGrid>
      </Hero>

      <ProductSection py={{ base: 12, lg: 24 }}>
        <SDKSection
          description="The ultimate development framework for all types of web3 games:
            free-to-own, play-to-earn, nft game, etc. Powerful Gaming Engine
            SDKs to integrate web3 features into your game."
          codeSelectorProps={{
            defaultLanguage: "unity",
            docs: "https://portal.thirdweb.com/gamingkit",
          }}
        />
      </ProductSection>

      <ProductSection py={{ base: 12, lg: 24 }}>
        <Flex alignItems="center" flexDirection="column">
          <Heading
            as="h2"
            size="display.sm"
            textAlign="center"
            mb={12}
            maxW={800}
          >
            Create new gaming universes
          </Heading>
          <Heading
            as="h3"
            size="subtitle.lg"
            textAlign="center"
            maxW="lg"
            color="whiteAlpha.700"
            fontWeight={400}
            fontSize="20px"
            mb={8}
          >
            Get inspiration from viral web3 game <strong>Cat Attack</strong>{" "}
            built in just 2 days using thirdweb.
          </Heading>
          <Container maxW="3xl">
            <CatAttackCard trackingCategory={TRACKING_CATEGORY} hideGithub />
          </Container>
        </Flex>
      </ProductSection>

      <ProductSection>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          gap={{ base: 12, md: 6 }}
          py={{ base: 12, md: 24 }}
        >
          <ProductLearnMoreCard
            title="Build"
            category={TRACKING_CATEGORY}
            description={
              <>
                Discover{" "}
                <TrackedLink
                  category={TRACKING_CATEGORY}
                  href="https://thirdweb.com/explore/gaming"
                  isExternal
                  label="build_explore"
                  color="blue.400"
                  _hover={{ textDecor: "underline" }}
                >
                  ready-to-go contracts
                </TrackedLink>{" "}
                for popular gaming use cases. Our powerful{" "}
                <TrackedLink
                  category={TRACKING_CATEGORY}
                  href="https://portal.thirdweb.com/gamingkit"
                  label="build_gaming_sdk"
                  color="blue.400"
                  _hover={{ textDecor: "underline" }}
                >
                  Gaming SDK
                </TrackedLink>{" "}
                enables you to easily integrate web3 features into games across
                native, mobile, console, browser, and VR platforms.
                <br />
                <TrackedLink
                  category={TRACKING_CATEGORY}
                  href="https://portal.thirdweb.com/unity"
                  label="build_unity_sdk"
                  isExternal
                  color="blue.400"
                  _hover={{ textDecor: "underline" }}
                >
                  Unity SDK
                </TrackedLink>{" "}
                available now.
                <br />
                Unreal Engine SDK coming soon.
              </>
            }
            icon={require("/public/assets/product-pages/dashboard/hero-icon-1.png")}
            href="https://portal.thirdweb.com/gamingkit"
          />
          <ProductLearnMoreCard
            title="Launch"
            category={TRACKING_CATEGORY}
            description="Deploy web3 games to any EVM chain (700+). Seamless contract deployment workflow designed for web3 dev teams to easily collaborate."
            icon={require("/public/assets/product-pages/dashboard/hero-icon-2.png")}
            href="https://portal.thirdweb.com/gamingkit"
          />
          <ProductLearnMoreCard
            title="Manage"
            category={TRACKING_CATEGORY}
            description="A single dashboard to configure your contracts and monitor contract activity for all your game's deployed contracts. Get insights on transaction count, volume, gas spend per contract to inform your game development."
            icon={require("/public/assets/product-pages/dashboard/hero-icon-3.png")}
            href="https://portal.thirdweb.com/dashboard"
          />
        </SimpleGrid>
      </ProductSection>

      <GameShowcase />

      <GuidesShowcase
        title="Start building web3 games"
        category={TRACKING_CATEGORY}
        description="Check out our guides and case studies to start building games with thirdweb"
        solution="Gaming"
        guides={GAMING_GUIDES}
      />

      <GuidesShowcase
        title="The best web3 games are built using thirdweb"
        category={TRACKING_CATEGORY}
        description="Learn from case studies on how other web3 games built their games using GamingKit."
        solution="Gaming"
        guides={GAMING_CASE_STUDIES}
        caseStudies
      />

      <Box
        h="1px"
        bg="linear-gradient(93.96deg, rgba(25, 26, 27, 0.8) 17.14%, var(--product-accent-color) 36.78%, rgba(108, 47, 115, 0.8) 61%, rgba(25, 26, 27, 0.8) 79.98%)"
        opacity="0.8"
      />
    </ProductPage>
  );
};

Gaming.pageId = PageId.SolutionsGaming;

export default Gaming;
