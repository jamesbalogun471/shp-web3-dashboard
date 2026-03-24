import { useState } from "react"
import axios from "axios"

export default function NFTDashboard(){

const [address,setAddress] = useState("")
const [nfts,setNFTs] = useState([])

const API_KEY = "lX9sTXDNkUbZKjJ62un0T"

async function loadNFTs(){

const url = `https://eth-sepolia.g.alchemy.com/v2/${API_KEY}/getNFTs?owner=${address}`

const res = await axios.get(url)

setNFTs(res.data.ownedNfts)

}

return(

<div>

<h2>NFT Dashboard</h2>

<input
placeholder="Enter wallet address"
onChange={(e)=>setAddress(e.target.value)}
/>

<button onClick={loadNFTs}>Load NFTs</button>

<div>

{nfts.map((nft,index)=>(
<div key={index}>

<img
src={nft.media[0]?.gateway}
width="150"
/>

<p>{nft.title}</p>

</div>
))}

</div>

</div>

)

}