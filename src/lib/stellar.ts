import freighter from "@stellar/freighter-api";
const { isConnected, getAddress, signTransaction } = freighter;
import { 
  Horizon, 
  TransactionBuilder, 
  Networks, 
  Keypair,
  Transaction,
  xdr,
  rpc
} from "@stellar/stellar-sdk";

const TESTNET_URL = "https://horizon-testnet.stellar.org";
const RPC_URL = "https://soroban-testnet.stellar.org";

let server: rpc.Server;

const getServer = () => {
  if (!server) {
    server = new rpc.Server(RPC_URL);
  }
  return server;
};

export const connectFreighter = async () => {
  if (await isConnected()) {
    const { address } = await getAddress();
    return address;
  }
  throw new Error("Freighter not connected");
};

export const getAccountInfo = async (publicKey: string) => {
  const horizon = new Horizon.Server(TESTNET_URL);
  return await horizon.loadAccount(publicKey);
};

export const signAndSubmit = async (txXdr: string) => {
  const { signedTxXdr, error } = await signTransaction(txXdr, {
    networkPassphrase: Networks.TESTNET,
  });

  if (error) throw new Error(error);

  const tx = new Transaction(signedTxXdr, Networks.TESTNET);
  return await getServer().sendTransaction(tx);
};

// Placeholder for Soroban NFT interaction
export const mintSorobanNFT = async (
  contractId: string, 
  userPublicKey: string, 
  metadata: string
) => {
  // In a real implementation, you'd use TransactionBuilder to call a Soroban function
  // and then sign it with Freighter.
  console.log("Minting on Soroban...", { contractId, userPublicKey, metadata });
  // This is a placeholder for the actual Soroban call logic
};
