export enum PageId {
  // unknown page id (default)
  Unknown = "unknown",
  // none case (for previous page id)
  None = "none",

  // ---------------------------------------------------------------------------
  //  marketing / growth pages
  // ---------------------------------------------------------------------------

  // thirdweb.com
  Homepage = "homepage-landing",

  // thirdweb.com
  About = "about-page",

  // thirdweb.com
  OSS = "oss-page",

  // thirdweb.com/auth
  AuthenticationLanding = "auth-landing",

  // thirdweb.com/publish
  PublishLanding = "publish-landing",

  // thirdweb.com/deploy
  DeployLanding = "deploy-landing",

  // thirdweb.com/contract-extensions
  ContractExtensionsLanding = "contract-extensions-landing",

  // thirdweb.com/web3-sdk
  Web3SDKLanding = "web3-sdk-landing",

  // thirdweb.com/pre-built-contracts
  PreBuiltContractsLanding = "pre-built-contracts-landing",

  // thirdweb.com/web3-dashboard
  DashboardLanding = "dashboard-landing",

  // thirdweb.com/web3-storage
  StorageLanding = "storage-landing",

  // thirdweb.com/ui-components
  UIComponentsLanding = "ui-components-landing",

  // thirdweb.com/build-base
  BuildBaseLanding = "build-base-landing",

  // thirdweb.com/gas
  GasEstimator = "gas-estimator",

  // thirdweb.com/chainlist
  ChainsLanding = "chains-landing",

  // thirdweb.com/hackathon/solanathon
  SolanaHackathonLanding = "solanathon",
  ReadyPlayer3Landing = "readyplayer3",

  // thirdweb.com/404
  PageNotFound = "page-not-found",

  // thirdweb.com/wallet-sdk
  WalletSDKLanding = "wallet-sdk-landing",

  // ---------------------------------------------------------------------------
  //  general product pages
  // ---------------------------------------------------------------------------

  // thirdweb.com/dashboard
  Dashboard = "dashboard",

  // thirdweb.com/dashboard/storage
  DashboardStorage = "dashboard-storage",

  // thirdweb.com/dashboard/rpc
  DashboardRPC = "dashboard-rpc",

  // thirdweb.com/dashboard/api-keys
  DashboardApiKeys = "dashboard-api-keys",

  // thirdweb.com/dashboard/wallets
  DashboardWallets = "dashboard-wallets",

  // thirdweb.com/dashboard/contracts
  Contracts = "contracts",
  // thirdweb.com/dashboard/programs
  Programs = "programs",

  // thirdweb.com/explore
  Explore = "explore",

  // thirdweb.com/events
  Events = "events",

  // thirdweb.com/explore/[category]
  ExploreCategory = "explore-category",

  // ---------------------------------------------------------------------------
  //  solutions pages
  // ---------------------------------------------------------------------------

  SolutionsCommerce = "solutions-commerce",
  SolutionsGaming = "solutions-gaming",
  SolutionsMinting = "solutions-minting",

  // ---------------------------------------------------------------------------
  //  network pages
  // ---------------------------------------------------------------------------

  NetworkSolana = "network-solana",

  // ---------------------------------------------------------------------------
  //  faucets pages
  // ---------------------------------------------------------------------------

  FaucetSolana = "faucet-solana",

  // ---------------------------------------------------------------------------
  //  "publish" product pages
  // ---------------------------------------------------------------------------

  // thirdweb.com/contracts/publish
  PublishMultiple = "publish-multiple-contracts",

  // thirdweb.com/contracts/publish/:id
  PublishSingle = "publish-single-contract",

  // thirdweb.com/:wallet
  // example: thirdweb.com/jns.eth
  Profile = "profile",

  // thirdweb.com/:wallet/:contractId
  // example: thirdweb.com/jns.eth/PermissionedERC721A
  PublishedContract = "published-contract",

  // ---------------------------------------------------------------------------
  //  "deploy" product pages
  // ---------------------------------------------------------------------------

  // thirdweb.com/contracts/deploy
  DeployMultiple = "deploy-multiple-contracts",

  // thirdweb.com/contracts/deploy/:id
  DeploySingle = "deploy-single-contract",

  // thirdweb.com/contracts/new
  NewContract = "new-contract",

  // thirdweb.com/contracts/custom
  NewCustomContract = "new-custom-contract",

  // thirdweb.com/contracts/new/pre-built
  PreBuiltContract = "new-pre-built-contract",

  // thirdweb.com/contracts/new/pre-built/:contractCategory
  // example: thirdweb.com/contracts/new/pre-built/drop/
  PreBuiltContractCategory = "new-pre-built-contract-category",

  // thirdweb.com/contracts/new/pre-built/:contractCategory/:contractType
  // example: thirdweb.com/contracts/new/pre-built/drop/nft-drop
  PreBuiltContractType = "new-pre-built-contract-type",

  // thirdweb.com/:network/:contractAddress (evm)
  // example: thirdweb.com/goerli/0x2eaDAa60dBB74Ead3E20b23E4C5A0Dd789932846
  DeployedContract = "deployed-contract",

  // thirdweb.com/:network/:contractAddress (solana)
  // example: thirdweb.com/solana/5GYspMpsfw3Vrf7FQ37Jbhpg4PeVZHEPrfPcXY9sGQzy
  DeployedProgram = "deployed-program",

  // thirdweb.com/:network
  // example: thirdweb.com/ethereum
  ChainLanding = "chain-landing",

  // thirdweb.com/bear-market-airdrop
  BearMarketAirdrop = "bear-market-airdrop",

  // ---------------------------------------------------------------------------
  //  learn pages
  // ---------------------------------------------------------------------------

  Learn = "learn",
}
