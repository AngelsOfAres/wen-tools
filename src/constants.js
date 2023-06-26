// NODE
export const MAINNET_ALGONODE_NODE = "https://mainnet-api.algonode.cloud";
export const TESTNET_ALGONODE_NODE = "https://testnet-api.algonode.cloud";

// INDEXER
export const MAINNET_ALGONODE_INDEXER = "https://mainnet-idx.algonode.cloud";
export const TESTNET_ALGONODE_INDEXER = "https://testnet-idx.algonode.cloud";

// DONATION WALLETS
export const DONATE_WALLET_1 =
  "O2ZPSV6NJC32ZXQ7PZ5ID6PXRKAWQE2XWFZK5NK3UFULPZT6OKIOROEAPU";
export const DONATE_WALLET_2 =
  "VYPDFMVRXCI2Z4FPC2GHB4QC6PSCTEDAS4EU7GE3W4B3MRHXNZO6BB2RZA";

// MINT FEES
export const MINT_FEE_WALLET =
  "RBZ4GUE7FFDZWCN532FFR5AIYJ6K4V2GKJS5B42JPSWOAVWUT4OHWG57YQ";
export const MINT_FEE_PER_ASA = 0.1;
export const UPDATE_FEE_PER_ASA = 0.05;

export const IPFS_ENDPOINT = "https://ipfs.algonode.xyz/ipfs/";

export const CREATOR_WALLETS = [
  "GLOW7AKCAZXWQRPI6Q7OCVAO75H45AIYMTDEH3VNPETKYFXMNHAMQOVMS4",
  "STPD5WZ7DMF2RBBGROROWS6U2HNKC4SOHZXTFDTRIWHTXQ46TA7HU3A2SI",
  "2INYXKE3I465ED7HGFELKC2WDSA3R4V3A7BEZDJ7RWFNSFU2OQW44WZBAM",
  "TINYGXPTQUIKUFF6HOUK5SDTTK4EZ3HJOBUCCWNDZ6QJYSZMXQTUSQPQZY",
  "TINYGNROP4U5RO444XQHM4HKVMYDFAVHIRLYPCXM7DBOF6CS2OZM7OMOMI",
];

export const PREFIXES = ["HORSE", "PONY", "tiny", "2INY"];

// TOOLS
export const TOOLS = [
  {
    id: "collection_snapshot",
    label: "🔎 Find Collection Holders",
    description: "Download all the holders for a collection in CSV format.",
    path: "/find-collection-holders",
    category: "general",
  },
  {
    id: "collection_data",
    label: "⬇️ Download ARC-69 Collection Data",
    description: "Download ARC-69 data for a collection in CSV format.",
    path: "/download-arc69-collection-data",
    category: "arc69",
  },
  {
    id: "batch_mint",
    label: "🖨️ ARC-69 Collection Mint",
    description: "Mint an ARC-69 collection in bulk.",
    path: "/arc69-collection-mint",
    category: "arc69",
  },
  {
    id: "batch_update",
    label: "⬆️ ARC-69 Collection Metadata Update",
    description: "Update the metadata for an ARC-69 collection in bulk.",
    path: "/arc69-metadata-update",
    category: "arc69",
  },
  {
    id: "arc3_batch_mint",
    label: "🖨️ ARC-3 Collection Mint",
    description: "Mint an ARC-3 collection in bulk.",
    path: "/arc3-collection-mint",
    category: "arc3",
  },
  {
    id: "arc19_batch_mint",
    label: "🖨️ ARC-19 Collection Mint",
    description: "Mint an ARC-19 collection in bulk.",
    path: "/arc19-collection-mint",
    category: "arc19",
  },
  {
    id: "arc19_batch_update",
    label: "⬆️ ARC-19 Collection Metadata Update",
    description: "Update the metadata for an ARC-19 collection in bulk.",
    path: "/arc19-metadata-update",
    category: "arc19",
  },
  {
    id: "arc19_collection_data",
    label: "⬇️ Download ARC-19 Collection Data",
    description: "Download ARC-19 data for a collection in CSV format.",
    path: "/download-arc19-collection-data",
    category: "arc19",
  },
  {
    id: "batch_optin",
    label: "➕ Asset Add",
    description: "Optin assets in bulk.",
    path: "/batch-optin",
    category: "general",
  },
  {
    id: "batch_optout",
    label: "➖ Asset Remove",
    description: "Optout assets in bulk.",
    path: "/batch-optout",
    category: "general",
  },
  {
    id: "batch_destroy",
    label: "❌ Asset Destroy",
    description: "Destroy (Delete) assets in bulk.",
    path: "/batch-destroy",
    category: "general",
  },
  {
    id: "airdrop_tool",
    label: "🪂 Asset Send/Airdrop",
    description: "Airdrop/Send assets/ALGO to a list of addresses.",
    path: "/airdrop",
    category: "general",
  },
  {
    id: "wallet_holdings",
    label: "💼 Wallet Holdings",
    description: "View the assets data of a wallet in CSV format.",
    path: "/wallet-holdings",
    category: "general",
  },
  {
    id: "multimint_asset_holders",
    label: "🌌 Multimint Asset Holders",
    description: "View the holders of a multimint asset list in CSV format.",
    path: "/multimint-asset-holders",
    category: "general",
  },
  {
    id: "ipfs_upload",
    label: "📁 IPFS Collection Upload",
    description: "Upload a collection images to IPFS.",
    path: "/ipfs-upload",
    category: "general",
  },
];

export const ARC19_URL_TEMPLATE =
  "template-ipfs://{ipfscid:0:dag-pb:reserve:sha2-256}";
