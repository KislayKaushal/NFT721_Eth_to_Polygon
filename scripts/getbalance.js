const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/Lock.sol/MyNft.json");
const PUBLIC_KEY = process.env.PUBLIC_KEY;

const tokenAddress = "0xcde392a5e86be34b3ec06e5206a5bf328d4353f9"; // place your erc721 contract address on polygon network here
const tokenABI = tokenContractJSON.abi;
const walletAddress = PUBLIC_KEY; // place your public address for your wallet here

async function main() {

    const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);

    console.log("You now have: " + await token.balanceOf(walletAddress) + " tokens");
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });