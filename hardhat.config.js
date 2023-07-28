/*
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
/*
module.exports = {
  solidity: "0.8.19",
};
*/

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
const { API_URL_Goerli,API_URL_Sepolia, PRIVATE_KEY } = process.env;
module.exports = {
  solidity: "0.8.7",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL_Goerli,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    sepolia: {
      url: API_URL_Sepolia,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/d7NQfWmjd1OWqYSK7l97gDfMHktwi7Wp",
      accounts: [`0x${PRIVATE_KEY}`]
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "3DYM9J9A6AZAAES22JETJSGKFXYQ9KMIE1"
  }
};
