var Mustache = require('mustache');


var ropsten = {
  account1: "0x070aE2b66a63De8b4Cd352e725CA81Ed663611F0",
  privateKey1: Buffer.from('7ae4495b934af72e8ce1d5792f98c119f1d831690ee27dcfeee4c077d7f4f7b3', 'hex'),
  contractJSON: require('../../abi/KCLOUD.json'),
  contractABI: require('../../abi/KCLOUD.json')['abi'],
  contractAddress: require('../../abi/KCLOUD.json')['networks']['3']['address'],
  infura: 'https://ropsten.infura.io/v3/f54c17f8fd334d78bcb2117202fe7ce0'
};

// Create a JavaScript representation of the smart contract
var localDung = {
  account1: "0x446D2B374fc76A338664e643Fd6b9F8Ed2D82d71", 
  privateKey1: Buffer.from('846473dff05b07e81d430c97ab9fc85e4ac947de7664401755677803ec7ba317', 'hex'),
  contractJSON: require('../../abi/KCLOUD.json'),
  contractABI: require('../../abi/KCLOUD.json')['abi'],
  contractAddress: require('../../abi/KCLOUD.json')['networks']['1635767099240']['address'],
};

//This one works in the lab with radblock01
var localDungOlzhasvar = {
  account1: "0xe9b84bd0e6186fe15b799b1c9504950be9b757f0", 
  privateKey1: Buffer.from('fcf36e0625ea8cfdd7e771bea899f0816c4cf98a04d70df7f16d51a1cdc15f18', 'hex'),
  contractJSON: require('../../abi/labKCLOUD.json'),
  contractABI: require('../../abi/labKCLOUD.json')['abi'],
  contractAddress: require('../../abi/labKCLOUD.json')['networks']['1500']['address'],
};

var network = localDungOlzhasvar;

export const account1 = network.account1;
export const privateKey1 = network.privateKey1;
export const contractJSON = network.contractJSON;
export const contractABI = network.contractABI;
console.log(contractABI);
export const contractAddress = network.contractAddress;
console.log(contractAddress);
export const infura = network.infura;