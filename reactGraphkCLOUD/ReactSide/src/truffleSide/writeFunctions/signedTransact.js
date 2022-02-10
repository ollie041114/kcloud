import { account1, privateKey1, infura, contractJSON, contractABI, contractAddress} from './ropstenVsSomething';
import Common from 'ethereumjs-common'

const Tx = require('ethereumjs-tx').Transaction
//const Tx = require('ethereumjs-tx')
const Web3 = require('web3');

//export const web3 = new Web3(new Web3.providers.HttpProvider(infura));
export const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8549'));

//For outside-lab testing
// const customCommon = Common.forCustomChain(
//     'mainnet',
//     {
//       name: '127.0.0.1',
//       networkId: 1635767099240,
//       chainId: 1337,
//     },
//     'petersburg',
//   );
const customCommon = Common.forCustomChain(
    'mainnet',
    {
      name: '127.0.0.1',
      networkId: 1500,
      chainId: 1500,
    },
    'istanbul',
  );

  // Create a JavaScript representation of the smart contract
// const contractJSON = require('..\\..\\abi\\KCLOUD.json');
// const contractABI = contractJSON['abi']
// const contractAddress = contractJSON['networks']['3']['address'];
console.log(contractABI);
export const contract = new web3.eth.Contract(contractABI, contractAddress);

// web3.eth.getBlock("latest", false, (error, result) => {
//    console.log("hass gasssss: ", result.gasLimit);
    // => 8000029
//  });


export async function signedTransaction(func, globalCallback){
    // var balance = await web3.eth.getBalance(account1); //Will give value in.
    // balance = web3.utils.toDecimal(balance);
    // console.log("Balance is ", balance);
    async function myFunction(callback){

        web3.eth.getTransactionCount(account1, (err, txCount) => {
            const txObject = {
                nonce:    web3.utils.toHex(txCount),
                gasLimit: web3.utils.toHex("4792621"), // Raise the gas limit to a much higher amount
                gasPrice: web3.utils.toHex(web3.utils.toWei('1', 'wei')),
                //from: account1,
                to: contractAddress,
                data: func
            }
            
            console.log("this is the Tx: ", Tx);
            //var tx = new Tx(txObject, {chain: 'ropsten'});
            var tx = new Tx(txObject,  { common: customCommon });
            tx.sign(privateKey1);
            var stx = tx.serialize();
            
            web3.eth.sendSignedTransaction('0x' + stx.toString('hex'), async (err, hash) => {
                 if (err) { console.log(err);
                    return;
                }
                 var transactionHash = hash;
                 callback(transactionHash);
                 console.log("transaction hash is "+transactionHash);
            });
            })
        }

        const expectedBlockTime = 1000; 
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        }

// Create a data object
    myFunction(function(hash) {
        var transactionHash = hash;
        console.log("Hash to be returned is "+transactionHash);
        (async function () {
            let transactionReceipt = null
                while (transactionReceipt == null) { // Waiting expectedBlockTime until the transaction is mined
                    transactionReceipt = await web3.eth.getTransactionReceipt(transactionHash);
                    await sleep(expectedBlockTime)
                }
                console.log("Got the transaction receipt: ", transactionReceipt);
                globalCallback(transactionReceipt);
        })();
    });
}
