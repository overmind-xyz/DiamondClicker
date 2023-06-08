import { AptosClient } from "aptos";

export const NODE_URL = "https://fullnode.mainnet.aptoslabs.com";
export const restClient = new AptosClient(NODE_URL, {
  WITH_CREDENTIALS: false,
});
export const aptosClient = new AptosClient("https://fullnode.mainnet.aptoslabs.com/v1");
export const CONTRACT_ADDRESS = "0xe9fa01aaa1a483c6c598d470ae9b8174226590499b25812d8f0e86192a3b8711";

export const UPGRADES = {
  0: {
    cost: 5,
    diamondsPerMinute: 5,
  },
  1: {
    cost: 25,
    diamondsPerMinute: 30,
  },
  2: {
    cost: 250,
    diamondsPerMinute: 350,
  },
};
