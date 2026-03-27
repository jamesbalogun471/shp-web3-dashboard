"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function ConnectWallet() {

  const [address, setAddress] = useState("");

  // Auto check if already connected
  async function getWallet() {
    if (window.ethereum) {

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const accounts = await provider.listAccounts();

      if (accounts.length > 0) {
        setAddress(accounts[0]);
      }
    }
  }

  // Connect button
  async function connect() {
    if (window.ethereum) {

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const accounts = await provider.send("eth_requestAccounts", []);

      setAddress(accounts[0]);
    }
  }

  // Run on page load
  useEffect(() => {
    getWallet();
  }, []);

  return (
    <div>
      <button onClick={connect}>
        Connect Wallet
      </button>

      <p>
        {address ? address : "Not connected"}
      </p>
    </div>
  );
}