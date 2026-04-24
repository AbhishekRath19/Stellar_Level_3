import { 
  isConnected, 
  setAllowed, 
  getAddress, 
  signTransaction 
} from "@stellar/freighter-api";
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
  try {
    const isReady = await isConnected();
    if (!isReady) {
      throw new Error("Freighter extension not found. Please install it from the Chrome Web Store.");
    }

    // Explicitly request access if not already allowed
    const allowed = await setAllowed();
    if (!allowed) {
      throw new Error("Access to Freighter was denied. Please allow this site to connect.");
    }

    const { address, error } = await getAddress();
    
    if (error) {
      throw new Error(error);
    }

    if (!address) {
      throw new Error("No address returned from Freighter. Make sure you are logged in and have an account.");
    }

    return address;
  } catch (err: any) {
    console.error("Freighter connection error:", err);
    throw err;
  }
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
