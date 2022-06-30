const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", () => {
  it("check the owner is the deployer", async () => {
    const accounts = await ethers.getSigners()
    const MyToken = await ethers.getContractFactory("NFTAsset");
    const myToken = await MyToken.deploy();
    await myToken.deployed();

    expect(await myToken.owner()).to.equal(accounts[0].address);
  })

  it("check if the owner can mint", async () => {
    const accounts = await ethers.getSigners()
    const MyToken = await ethers.getContractFactory("NFTAsset");
    const myToken = await MyToken.deploy();
    await myToken.deployed();

    const CID = 'QmRhEtfAigxUfFHsHbWozz877PghdM2z9Uod1PqtUiUW8Q';

    await myToken.safeMint(`${CID}/0.json`)
    await myToken.safeMint(`${CID}/1.json`)
    expect(await myToken.balanceOf(accounts[0].address)).to.equal(2);
  })
})