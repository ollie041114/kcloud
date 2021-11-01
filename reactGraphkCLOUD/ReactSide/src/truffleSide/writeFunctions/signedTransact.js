import { account1, privateKey1, contractJSON, contractABI, contractAddress, infura } from './ropstenVsSomething';
var Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3');

export const web3 = new Web3(new Web3.providers.HttpProvider(
    'https://ropsten.infura.io/v3/f54c17f8fd334d78bcb2117202fe7ce0'
));

export const contract = new web3.eth.Contract(contractABI, contractAddress);


export async function signedTransaction(func, globalCallback){
    async function myFunction(callback){

        web3.eth.getTransactionCount(account1, (err, txCount) => {
            const txObject = {
                nonce:    web3.utils.toHex(txCount),
                gasLimit: web3.utils.toHex(8000000), // Raise the gas limit to a much higher amount
                gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
                //from: account1,
                to: contractAddress,
                data: func
            }
            var tx = new Tx(txObject, {chain: 'ropsten'});
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