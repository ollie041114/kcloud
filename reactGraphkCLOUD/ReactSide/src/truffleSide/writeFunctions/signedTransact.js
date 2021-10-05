var Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3');

export const web3 = new Web3(new Web3.providers.HttpProvider(
    'https://ropsten.infura.io/v3/f54c17f8fd334d78bcb2117202fe7ce0'
));

const account1 = '0x070aE2b66a63De8b4Cd352e725CA81Ed663611F0' // Your account address 1
const privateKey1 = Buffer.from('7ae4495b934af72e8ce1d5792f98c119f1d831690ee27dcfeee4c077d7f4f7b3', 'hex')


  // Create a JavaScript representation of the smart contract
const contractABI = require('../build/contracts/KCLOUD.json');
const contractAddress = '0x7d1000d41dfa26d10dccf90f30dbc2b0f94f3d1e';
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