const TestCoin = artifacts.require("./TestCoin.sol");

module.exports = async function(deployer) {
  await deployer.deploy(TestCoin, "TestCoin", "TestCoin")
  const erc721 = await TestCoin.deployed()
};