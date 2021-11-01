var Mustache = require('mustache');

var ropsten = {
  account1: "0x070aE2b66a63De8b4Cd352e725CA81Ed663611F0",
  privateKey1: Buffer.from('7ae4495b934af72e8ce1d5792f98c119f1d831690ee27dcfeee4c077d7f4f7b3', 'hex'),
  contractJSON: require('..\\..\\abi\\KCLOUD.json'),
  contractABI: require('..\\..\\abi\\KCLOUD.json')['abi'],
  contractAddress: require('..\\..\\abi\\KCLOUD.json')['networks']['3']['address'],
  infura: 'https://ropsten.infura.io/v3/f54c17f8fd334d78bcb2117202fe7ce0'
};

// Create a JavaScript representation of the smart contract
var localDung = {
  account1: "0x070aE2b66a63De8b4Cd352e725CA81Ed663611F0", // just google how to find from Truffle
  privateKey1: Buffer.from('7ae4495b934af72e8ce1d5792f98c119f1d831690ee27dcfeee4c077d7f4f7b3', 'hex'), // just google how to find from Truffle
  contractJSON: require('..\\..\\abi\\KCLOUD.json'), // just google how to find from Truffle
  contractABI: require('..\\..\\abi\\KCLOUD.json'), // just google how to find from Truffle 
  contractAddress: require('..\\..\\abi\\KCLOUD.json')['networks']['3']['address'], // just google how to find from Truffle
  infura: 'https://ropsten.infura.io/v3/f54c17f8fd334d78bcb2117202fe7ce0' // I have no idea? Google "Connect web3 with local truffle Ethereum"
};

var network = ropsten;

export const account1 = network.account1;
export const privateKey1 = network.privateKey1;
export const contractJSON = network.contractJSON;
export const contractABI = network.contractABI;
console.log(contractABI);
export const contractAddress = network.contractAddress;
console.log(contractAddress);
export const infura = network.infura;