const Web3 = require('web3')
const rpcURL = 'https://ropsten.infura.io/v3/849d66baf41c4cb6b08458da9c70f552' // Your RPC URL goes here
const web3 = new Web3(rpcURL)

//connect to metamask


//get eth address from metamask




// assign account to address const
const address = "0xF36EAE3B23009fB9D1864B4377605aD2e667EFd4" // Your account address goes here

var balance;

// retrieve account balance from web3
web3.eth.getBalance(address, (err, wei) => {
  balance = web3.utils.fromWei(wei, 'ether')
  
})

console.log(balance);
module.exports = balance;