# NFT template

you can use this template to create an nft, this project has the following

- the nfts are uploaded as a json to pinata
- the smart contract is deployed using hardhat deploy
- the smart contract is verifiable using etherscan plugin

### how to run the project

- clone the project
- `cd` into the project
- `npm i `
- `npx hardhat compile`
- `npx hardhat test`
- `npx hardhat deploy --network [your network]`
- `npx hardhat verify --network [your network] [your smart contract address]`
