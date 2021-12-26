var keythereum = require("keythereum");
var datadir = "/home/radblock05/Desktop/geth/node5";
var address= "0x3ce23649df5c8317e4e51efb511eb1c6f4b312ec";
const password = "node5";

var keyObject = keythereum.importFromFile(address, datadir);
var privateKey = keythereum.recover(password, keyObject);
console.log(privateKey.toString('hex'));

