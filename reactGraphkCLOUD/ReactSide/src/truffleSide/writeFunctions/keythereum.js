var keythereum = require("keythereum");
var datadir = "/home/radblock01/Desktop/geth/node1";
var address= "0xe9b84bd0e6186fe15b799b1c9504950be9b757f0";
const password = "node1";

var keyObject = keythereum.importFromFile(address, datadir);
var privateKey = keythereum.recover(password, keyObject);
console.log(privateKey.toString('hex'));

