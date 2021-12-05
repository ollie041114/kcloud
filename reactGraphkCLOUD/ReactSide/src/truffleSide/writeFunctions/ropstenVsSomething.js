var Mustache = require('mustache');

function getData() {
  let data = localStorage.getItem('state'); 
  if(data !== undefined) { 
    console.log(JSON.parse(data)); 
  } 
  return JSON.parse(data);
}

function getAddress() { 
  var data = getData();
  var address = "";
  if (data == "Node 1"){
    address = "0xe9b84bd0e6186fe15b799b1c9504950be9b757f0";
  }
  else if (data == "Node 2"){
    address = "0x1eca039c92ee3071bd71c1d300395c5090d945e3";
  }
  else if (data == "Node 3"){
    address = "0x6dafb09af6c6e2c10357ccbefdb71bd4ae8e5f52";
  }
  else if (data == "Node 4"){
    address = "0xc21a53a858759296445df1af04e4338a042a7931";
  }
  else if (data == "Node 5"){
    address = "0x3ce23649df5c8317e4e51efb511eb1c6f4b312ec";
  }
  return address;
} 

function getPrivateKey() { 
  var data = getData();
  var privateKey = "";
  if (data == "Node 1"){
    privateKey = "fcf36e0625ea8cfdd7e771bea899f0816c4cf98a04d70df7f16d51a1cdc15f18";
  } else if (data == "Node 2"){
    privateKey = "4b4fd9826c1bb97ccf7483261d3b772f3dacba30372e33a6c05f72a63ba940e0";
  } else if (data == "Node 3"){
    privateKey = "8a958d37d99c5a1efed93f8b57dc33d838c5c3cb5d0eb19f20f276468eeea412";
  } else if (data == "Node 4"){
    privateKey = "22e2a5cabf8826f9f75090a71db77120f4b8370f846c6abd3b9085cd19bc438d";
  } else if (data == "Node 5"){
    privateKey = "39581bc5e366373dd2738ae21f5a168ff0d1b628e1d7f10aabe202b7f7b03d3e";
  }
  return privateKey;
}

// function getPrivateKey() { 
//   var data = getData();
//   var forWeb3 = "";
//   if (data == "Node 1"){
//     forWeb3 = "fcf36e0625ea8cfdd7e771bea899f0816c4cf98a04d70df7f16d51a1cdc15f18";
//   }
//   if (data == "Node 2"){
//     forWeb3 = "4b4fd9826c1bb97ccf7483261d3b772f3dacba30372e33a6c05f72a63ba940e0";
//   }
//   return privateKey;
// }

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
  account1: getAddress(), //"0xe9b84bd0e6186fe15b799b1c9504950be9b757f0", 
  privateKey1: Buffer.from(getPrivateKey(), 'hex'),
  contractJSON: require('../../abi/labKCLOUD.json'),
  contractABI: require('../../abi/labKCLOUD.json')['abi'],
  contractAddress: require('../../abi/labKCLOUD.json')['networks']['1500']['address'],
};

var network = localDungOlzhasvar;

export const account1 = network.account1;
export const privateKey1 = network.privateKey1;
console.log("Our address is ", network.account1);
console.log("Our private key is ", network.privateKey1);
export const contractJSON = network.contractJSON;
export const contractABI = network.contractABI;
console.log(contractABI);
export const contractAddress = network.contractAddress;
console.log(contractAddress);
export const infura = network.infura;