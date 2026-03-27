import axios from "axios";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

export default function NFTDashboard() {



  const [address, setAddress] = useState("");
  const [nfts, setNFTs] = useState([]);
  const [loading, setLoading] = useState(false); 

useEffect(() => {

  if (!window.ethereum) return;

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setAddress(""); // user disconnected
    } else {
      setAddress(accounts[0]);
    }
  };

  window.ethereum.on("accountsChanged", handleAccountsChanged);


  return () => {
    window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
  };

}, []);

  const API_KEY = "lX9sTXDNkUbZKjJ62un0T";

  async function loadNFTs() {

    if (!address) {
      alert("Please enter a wallet address");
      return;
    }

 if (!window.ethereum) {
      alert("MetaMask not installed");
      return;
    }

const provider = new ethers.BrowserProvider(window.ethereum);
    const network = await provider.getNetwork();

    if (Number(network.chainId) !== 11155111) {
      alert("Switch to Sepolia Network");
      return;
    }



    const url = `https://eth-sepolia.g.alchemy.com/v2/${API_KEY}/getNFTs?owner=${address}`;

    setLoading(true);

    try {

      const res = await axios.get(url);
      setNFTs(res.data.ownedNfts || []);

    } catch (error) {

      console.error(error);
      alert("Failed to load NFTs");

    }

    setLoading(false);
  }

  return (
    <div>

      <h2>NFT Dashboard</h2>

      <input
        placeholder="Enter wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button onClick={loadNFTs}>
        Load NFTs
      </button>

      <div>

       
        {loading && <p>Loading NFTs...</p>}

        {!loading && nfts.length === 0 && <p>No NFTs found</p>}

        {nfts.map((nft, index) => {

          const image = nft.media?.[0]?.gateway;

          return (
            <div key={index}>

              {image && (
                <img
                  src={image}
                  width="150"
                  alt="NFT"
                />
              )}

              <p>{nft.title || "No Title"}</p>

            </div>
          );
        })}

      </div>

    </div>
  );
}