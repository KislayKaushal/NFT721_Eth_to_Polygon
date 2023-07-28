const hre = require("hardhat");
const fxRootContractABI = require("../contractABI.json");
const tokenContractJSON = require("../artifacts/contracts/Lock.sol/MyNft.json");

const tokenAddress = "0xcde392a5e86be34b3ec06e5206a5bf328d4353f9"; // place your erc721 contract address here
const tokenABI = tokenContractJSON.abi;
const fxERC721RootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";
const walletAddress = "0x146d57503bA557d6A5c8630829Ab21aE65B44F1D"; // place your public address for your wallet here



async function main() {

    const tokenContract = await hre.ethers.getContractAt(tokenABI, tokenAddress);
    const fxContract = await hre.ethers.getContractAt(fxRootContractABI, fxERC721RootAddress);

    console.log("Contract address:", tokenAddress);

    // Define the token IDs of the NFTs you want to transfer
    const tokenIds = [1, 2, 3, 4, 5];

    for (let i = 0; i < tokenIds.length; i++) {
      const tokenId = tokenIds[i];
      const approveTx = await tokenContract.approve(fxERC721RootAddress, tokenId);
      await approveTx.wait();

      console.log('Approval confirmed');

      const depositTx = await fxContract.deposit(tokenAddress, walletAddress, tokenId, "0x6556");
      await depositTx.wait();

      console.log("Tokens deposited");
    }
    
  
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });