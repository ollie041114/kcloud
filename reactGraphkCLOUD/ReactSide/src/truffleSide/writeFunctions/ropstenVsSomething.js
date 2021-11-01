var Mustache = require('mustache');

var ropsten = {
  account1: "0x070aE2b66a63De8b4Cd352e725CA81Ed663611F0",
  privateKey1: "7ae4495b934af72e8ce1d5792f98c119f1d831690ee27dcfeee4c077d7f4f7b3",
  contractJSON: require('..\\..\\abi\\KCLOUD.json'),
  contractABI: this.contractJSON['abi'],
  contractAddress: this.contractJSON['networks']['3']['address'],
  infura: 'https://ropsten.infura.io/v3/f54c17f8fd334d78bcb2117202fe7ce0'
};
// Create a JavaScript representation of the smart contract
var local = {
  account1: "0x070aE2b66a63De8b4Cd352e725CA81Ed663611F0",
  privateKey1: "7ae4495b934af72e8ce1d5792f98c119f1d831690ee27dcfeee4c077d7f4f7b3",
  contractJSON: require('..\\..\\abi\\KCLOUD.json'),
  contractABI: this.contractJSON['abi'],
  contractAddress: this.contractJSON['networks']['3']['address'],
  infura: 'https://ropsten.infura.io/v3/f54c17f8fd334d78bcb2117202fe7ce0'
};

var network = ropsten;

export const account1 = Mustache.render("{{account1}}", network);
export const privateKey1 = Mustache.render("{{privateKey1}}", network);
export const contractJSON = Mustache.render("{{contractJSON}}", network);
export const contractABI = Mustache.render("{{contractABI}}", network);
export const contractAddress = Mustache.render("{{contractAddress}}", network);
export const infura = Mustache.render("{{infura}}", network);