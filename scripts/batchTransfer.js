const hre = require("hardhat");
const PUBLIC_KEY = process.env.PUBLIC_KEY;

async function main() {
  // Connect to the Mumbai Ethereum Testnet
  if (hre.network.name !== "mumbai") {
    throw new Error("Please run the script on the Mumbai network.");
  }

  console.log("Connected to network:", hre.network.name);

  
  const FxrootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";
  const MyNftAddress = "0x39d62eFc467dF59fA6DBfD3E1E4bE853c32D8f8e"; 

  // Retrieve the deployed MyNFT contract instance
  const MyNFT = await hre.ethers.getContractFactory("MyNft");
  const myNft = await MyNFT.attach(MyNftAddress);
  console.log("Contract address:", myNft.address);

  const walletAddress = PUBLIC_KEY;

  // Define the token IDs of the NFTs you want to transfer
  const tokenIds = [1, 2, 3, 4, 5]; 

  // Approve and deposit each NFT to the FxPortal Bridge for transfer
  for (let i = 0; i < tokenIds.length; i++) {
    const tokenId = tokenIds[i];
    console.log(`Approving NFT with token ID ${tokenId} for transfer...`);
    await myNft.approve(FxrootAddress, tokenId);

    console.log(`Depositing NFT with token ID ${tokenId} to the FxPortal Bridge...`);
    await myNft["safeTransferFrom(address,address,uint256)"](hre.ethers.constants.AddressZero, FxrootAddress, tokenId);
  }

  console.log("Batch transfer of NFTs completed successfully!");

  // Test balanceOf
  const balance = await MyNFT.balanceOf(walletAddress);s
  console.log("MyNFT wallet balance", walletAddress, "is:", balance.toString());

}

// Run the script with the Hardhat command line interface
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });