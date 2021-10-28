// Allows us to use ES6 in our migrations and tests.
require('babel-register')
require('babel-polyfill')
require('dotenv').config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { API_URL, MNEMONIC } = process.env;


module.exports = {
  networks: {
    development: {
        host: '127.0.0.1',
        port: 7545,
        network_id: '*', // Match any network id
    },
	ropsten: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, API_URL)
      },
      network_id: '*',
      gas: 4000000 //4M is the max
	},
  },
compilers: {
    solc: {
      version: "0.8.6"
    },
  },

};


