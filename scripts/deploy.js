const hre = require("hardhat");

async function main() {
  // Deploying the contract
  const ERC721 = await hre.ethers.getContractFactory("MyNft");
  const MyNft = await ERC721.deploy("BatmanNFT", "BNFT", "Create an image of batman wearing a suit and pant like school uniform");
  await MyNft.deployed();

  console.log("Contract deployed to:", MyNft.address);
}

// Running the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  //0xcde392a5e86be34b3ec06e5206a5bf328d4353f9