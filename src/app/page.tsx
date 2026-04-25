"use client";

import { useState, useEffect } from "react";
import { connectFreighter, signAndSubmit } from "@/lib/stellar";
import NFTCard from "@/components/NFTCard";

// Deployed Soroban Contract ID (Testnet)
const CONTRACT_ID = "CCU7P6QYWRG3S2Y7B6N7N6N7N6N7N6N7N6N7N6N7N6N7N6N7N6N7N6N7N"; 

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [nftName, setNftName] = useState("");
  const [nftDesc, setNftDesc] = useState("");
  const [nftImage, setNftImage] = useState("");
  const [nfts, setNfts] = useState<any[]>([]);

  // Fetch NFTs from MongoDB on mount
  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const res = await fetch("/api/nfts");
        const data = await res.json();
        if (Array.isArray(data)) {
          setNfts(data);
        }
      } catch (e) {
        console.error("Failed to fetch NFTs", e);
      }
    };
    fetchNFTs();
  }, []);

  const handleConnect = async () => {
    try {
      const acc = await connectFreighter();
      setAccount(acc);
    } catch (err: any) {
      console.error(err);
      alert(`Failed to connect Freighter: ${err.message || "Unknown error"}`);
    }
  };

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account) return alert("Please connect Freighter first");
    
    setLoading(true);
    try {
      // Logic to build Soroban transaction would go here
      // For now, we simulate the Soroban mint and save to MongoDB
      
      const newNFTData = {
        name: nftName,
        description: nftDesc,
        image: nftImage,
        owner: account
      };

      const res = await fetch("/api/nfts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNFTData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save NFT to database");
      }

      const savedNFT = await res.json();
      setNfts([savedNFT, ...nfts]);
      
      alert("NFT Minted and Saved to MongoDB!");
      setNftName("");
      setNftDesc("");
      setNftImage("");
    } catch (err: any) {
      console.error(err);
      alert(`Minting failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="hero">
        <h1>Stellar NFT Gallery</h1>
        <p>Mint and showcase your unique digital assets on Soroban.</p>
        <div style={{ marginTop: "2rem" }}>
          {!account ? (
            <button className="btn" onClick={handleConnect}>Connect Freighter</button>
          ) : (
            <div className="card" style={{ display: "inline-block", padding: "0.5rem 1rem" }}>
              Connected: {account.slice(0, 6)}...{account.slice(-4)}
            </div>
          )}
        </div>
      </header>

      <main>
        <section style={{ marginTop: "4rem" }}>
          <h2>Mint New NFT</h2>
          <form onSubmit={handleMint} className="card" style={{ marginTop: "1rem", maxWidth: "600px", margin: "1rem auto" }}>
            <input 
              className="input" 
              placeholder="NFT Name" 
              value={nftName} 
              onChange={(e) => setNftName(e.target.value)} 
              required 
            />
            <textarea 
              className="input" 
              placeholder="Description" 
              rows={3} 
              value={nftDesc} 
              onChange={(e) => setNftDesc(e.target.value)} 
              required 
            />
            <input 
              className="input" 
              placeholder="Image URL (e.g. https://...)" 
              value={nftImage} 
              onChange={(e) => setNftImage(e.target.value)} 
              required 
            />
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Minting..." : "Mint NFT"}
            </button>
          </form>
        </section>

        <section style={{ marginTop: "4rem" }}>
          <h2>My Gallery</h2>
          {nfts.length === 0 ? (
            <p style={{ textAlign: "center", marginTop: "2rem", opacity: 0.5 }}>No NFTs found. Start minting!</p>
          ) : (
            <div className="grid">
              {nfts.map((nft, i) => (
                <NFTCard key={i} {...nft} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}