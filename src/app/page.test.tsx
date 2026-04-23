import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Home from "./page";
import freighter from "@stellar/freighter-api";

// Mock Freighter API
vi.mock("@stellar/freighter-api", () => {
  return {
    default: {
      isConnected: vi.fn().mockResolvedValue(true),
      getAddress: vi.fn().mockResolvedValue({ address: "GC1234567890" }),
      signTransaction: vi.fn().mockResolvedValue({ signedTxXdr: "mock_xdr" }),
    },
  };
});

// Mock Stellar SDK
vi.mock("@stellar/stellar-sdk", () => {
  class MockServer {
    sendTransaction = vi.fn().mockResolvedValue({ status: "SUCCESS" });
  }

  return {
    rpc: {
      Server: MockServer,
    },
    Networks: { TESTNET: "testnet" },
    TransactionBuilder: vi.fn(),
  };
});

describe("Stellar NFT Gallery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it("Test 1: successfully connects Freighter wallet", async () => {
    render(<Home />);
    
    const connectBtn = await screen.findByText(/Connect Freighter/i);
    fireEvent.click(connectBtn);

    await waitFor(() => {
      expect(screen.getByText(/GC1234...7890/i)).toBeInTheDocument();
    });
  });

  it("Test 2: renders the mint form correctly", async () => {
    render(<Home />);
    
    expect(screen.getByPlaceholderText(/NFT Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Image URL/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Mint NFT/i })).toBeInTheDocument();
  });

  it("Test 3: displays NFTs from localStorage cache", async () => {
    const mockNft = {
      id: "1",
      name: "Stellar NFT",
      description: "Awesome Stellar Asset",
      image: "https://mock.com/stellar.png"
    };
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify([mockNft]));

    render(<Home />);

    // Use a more specific selector to avoid matching "Stellar NFT Gallery"
    expect(await screen.findByRole('heading', { name: 'Stellar NFT', level: 3 }, { timeout: 3000 })).toBeInTheDocument();
  });
});
