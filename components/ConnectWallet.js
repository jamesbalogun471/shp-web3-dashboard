import { useState } from "react"
import { ethers } from "ethers"

const [address, setAddress] = useState("")

async function getWallet(){

if(window.ethereum){

const provider = new ethers.providers.Web3Provider(window.ethereum)

const accounts = await provider.listAccounts()

if(accounts.length > 0){

setAddress(accounts[0])

}

}

}

export default function ConnectWallet(){

const [wallet,setWallet] = useState("Not connected")

async function connect(){

if(window.ethereum){

const provider = new ethers.providers.Web3Provider(window.ethereum)

await provider.send("eth_requestAccounts",[])

const signer = provider.getSigner()

const address = await signer.getAddress()

setWallet(address)

}

}

return(

<div>

<button onClick={connect}>Connect Wallet</button>

<p>{wallet}</p>

</div>

)

}
