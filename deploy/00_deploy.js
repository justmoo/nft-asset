const { ethers } = require("hardhat");
let { networkConfig } = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  // get the contract and the interface 
  const Token = await deploy("NFTAsset", {
    from: deployer,
    log: true,
  });
  const tokenContract = await ethers.getContractFactory("NFTAsset");
  // get accounts to test
  const accounts = await ethers.getSigners();
  const singer = accounts[0];
  const buyer = accounts[1];

  const token = new ethers.Contract(
    Token.address,
    tokenContract.interface,
    singer
  );

  // get CID from pinata
  const CID = 'QmRhEtfAigxUfFHsHbWozz877PghdM2z9Uod1PqtUiUW8Q';
  // mint 10 nfts

  for (let i = 0; i < 10; i++) {
    console.log(`Minting token ${i}`);
    await token.safeMint(`${CID}/${i}.json`);
    console.log(`Minting token ${i} done`);
  }
  // pick the network out from the mapping 
  const networkName = networkConfig[chainId]["name"];


  log(
    `Verify with : \n  npx hardhat verify --network ${networkName}  ${token.address}`
  );
};
