import { Flex } from "@chakra-ui/react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { AppLayout } from "components/app-layouts/app";
import { ContractRow } from "components/explore/contract-row";
import { DeployUpsellCard } from "components/explore/upsells/deploy-your-own";
import { ReleaseUpsellCard } from "components/explore/upsells/release-submit";
import { PublisherSDKContext } from "contexts/custom-sdk-context";
import {
  EXPLORE_PAGE_DATA,
  ExploreCategory,
  prefetchCategory,
} from "data/explore";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { NextSeo } from "next-seo";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "pages/_app";
import React, { ReactElement } from "react";
import { Heading, Text } from "tw-components";

const ExplorePage: ThirdwebNextPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  return (
    <>
      <NextSeo
        title="Explore | Smart Contracts"
        description="Browse a large collection of ready-to-deploy contracts that have been built by thirdweb and other contract developers. Find a contract for your specific app's or game's needs."
        openGraph={{
          title: "thirdweb Explore: Smart Contracts & Protocols",
          description:
            "Browse a large collection of ready-to-deploy contracts that have been built by thirdweb and other contract developers. Find a contract for your specific app's or game's needs.",
          images: [
            {
              url: "https://thirdweb.com/thirdweb-explore.png",
              width: 1200,
              height: 630,
              alt: "thirdweb Explore",
            },
          ],
        }}
      />

      <Flex direction="column" gap={{ base: 12, md: 16 }}>
        <Flex direction="column" gap={2}>
          <Heading as="h1" size="display.md">
            Explore
          </Heading>
          <Text size="body.xl" maxW="container.md">
            Find the smart contract that suits your needs. Deploy with one click
            to Ethereum and other EVM compatible blockchains.
          </Text>
        </Flex>
        {props.categories.map((category, idx) => (
          <React.Fragment key={category.id}>
            {Math.floor(props.categories.length / 2) === idx && (
              <ReleaseUpsellCard />
            )}
            <ContractRow category={category} />
          </React.Fragment>
        ))}
        <DeployUpsellCard />
      </Flex>
    </>
  );
};

ExplorePage.getLayout = (page: ReactElement) => (
  <AppLayout noSEOOverride>
    <PublisherSDKContext>{page}</PublisherSDKContext>
  </AppLayout>
);

ExplorePage.pageId = PageId.Explore;

export default ExplorePage;

interface ExplorePageProps {
  categories: ExploreCategory[];
}

export const getStaticProps: GetStaticProps<ExplorePageProps> = async () => {
  const categories = EXPLORE_PAGE_DATA;

  // pre load the data as well
  const queryClient = new QueryClient();
  await Promise.all(categories.map((c) => prefetchCategory(c, queryClient)));

  return {
    props: { categories, dehydratedState: dehydrate(queryClient) },
  };
};
