// interact.js
const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const contract = require("./build/contracts/TestCoin.json"); 
console.log(JSON.stringify(contract.abi));
// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network="ropsten", API_KEY);
// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);
// Contract
const testCoinContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
  const uri = await testCoinContract.tokenURI(0);
  console.log("The uri is: " + uri);
}
main();