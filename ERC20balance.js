const Web3 = require('web3')
const rpcURL = 'https://ropsten.infura.io/v3/849d66baf41c4cb6b08458da9c70f552' // Your RPC URL goes here
const web3 = new Web3(rpcURL)


// ABI to get ERC-20 Token Balance

const minABI = [  
  // balanceOf
  {    
    constant: true,

    inputs: [{ name: "_owner", type: "address" }],

    name: "balanceOf",

    outputs: [{ name: "balance", type: "uint256" }],

    type: "function",
  },

];

//import account variable from app.js and reassign walletaddress to it

// hardcoded address
const tokenAddress = "0x169dc01a0873e5a306f83d6b233ca20136c483df";
const walletAddress = "0xE7AdD65c5C00511821779230Aa7Ee81daF034059"; // require ('./app.js') , var account

// invoking web3 contract method using ABI and tokenaddress as arguements

const contract = new web3.eth.Contract(minABI, tokenAddress);

//connect to metamask


//get eth address from metamask

//async function to get balance using method balanceof 
async function getBalance() {
  const result = await contract.methods.balanceOf(walletAddress).call(); 
  
  const format = web3.utils.fromWei(result); 
  console.log(format);
}

getBalance();


// // retrieve account balance from web3
// web3.eth.getBalance(address, (err, wei) => {
//   balance = web3.utils.fromWei(wei, 'ether')
//   console.log(balance);
// })

// // console.log(balance);
// module.exports = balance;