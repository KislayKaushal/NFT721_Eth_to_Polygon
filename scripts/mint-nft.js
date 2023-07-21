require("dotenv").config();
const API_URL = process.env.API_URL_Sepolia;

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/Lock.sol/MyNft.json");

const contractAddress = "0x39d62eFc467dF59fA6DBfD3E1E4bE853c32D8f8e";
const ipfsUrls = [
  "https://gateway.pinata.cloud/ipfs/QmRnDDec39hYttvzrM1rtrWCs26E8odY2g3pRcpbk5rzWq",
  "https://gateway.pinata.cloud/ipfs/QmSMJmhd1CdqQDMVP9Hztd1vdmkAXaBfjZkkxf8iwyKh7D",
  "https://gateway.pinata.cloud/ipfs/QmZfS1rzUh2KmjtxkxYVMKsLfggNBgY6K3btppyvxDe9aq",
  "https://gateway.pinata.cloud/ipfs/QmWgqfw31djMfv6cwyYKbcCxAatQXkxrzPqaATxFGvjysW",
  "https://gateway.pinata.cloud/ipfs/Qma4uk4KdDzH7Cfyoc1e4RVrJ1XejGBVRmXPpdbVRPKKcc"
];

async function mintNFT(tokenURI) {
  try {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce
  
    // Create a contract instance
    const MyNft = new web3.eth.Contract(contract.abi, contractAddress);

    //the transaction
    const tx = {
      from: PUBLIC_KEY,
      to: contractAddress,
      nonce: nonce,
      gas: 50000000,
      data: MyNft.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(), 
      
    };
  
    const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
    console.log(
      "The transaction was successful. Transaction hash:",
      receipt.transactionHash
    );
  } catch (error) {
    console.log("Something went wrong:", error);
  }
}

async function mintNFTs() {
  for (let i = 0; i < ipfsUrls.length; i++) {
    await mintNFT(ipfsUrls[i]);
  }
}

mintNFTs();
