import { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";

export default function NFTDashboard() {
  const [address, setAddress] = useState("");
  const [nfts, setNFTs] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "lX9sTXDNkUbZKjJ62un0T";

  
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        setAddress(""); // user disconnected
        setNFTs([]);    // clear NFTs
      } else {
        setAddress(accounts[0]);
      }
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  async function loadNFTs() {
    if (!window.ethereum) {
      alert("MetaMask not installed");
      return;
    }

    if (!address) {
      alert("Please enter a wallet address");
      return;
    }

    try {
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();

      if (network.chainId !== 11155111) { // Sepolia
        alert("Switch to Sepolia Network");
        return;
      }

const url = `https://eth-sepolia.g.alchemy.com/nft/v3/${API_KEY}/getNFTsForOwner?owner=${address}`;
      
      setLoading(true);

      const res = await axios.get(url);
console.log("NFT RESPONSE:", res.data);
      setNFTs(res.data.ownedNfts || []);
    } catch (error) {
  console.error("FULL ERROR:", error);
  console.error("RESPONSE:", error.response);
  alert("Failed to load NFTs");
}finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>NFT Dashboard</h2>

      <input
        placeholder="Enter wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ width: "300px", padding: "5px" }}
      />

      <button onClick={loadNFTs} style={{ marginLeft: "10px", padding: "5px 10px" }}>
        Load NFTs
      </button>

      <div style={{ marginTop: "20px" }}>
        {loading && <p>Loading NFTs...</p>}
        {!loading && nfts.length === 0 && <p>No NFTs found</p>}

        {nfts.map((nft, index) => {
          const image = nft.media?.[0]?.gateway;
          return (
            <div key={index} style={{ marginBottom: "20px" }}>
              {image && (
                <img src={image} width="150" alt="NFT" style={{ display: "block" }} />
              )}
              <p>{nft.title || "No Title"}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}