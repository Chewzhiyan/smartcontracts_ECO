Connecting metamask to show token balance

All node modules have been installed, in the event web3 shows an error:
1. Go to terminal
2. Cd directory
3. npm install web3

Feaures:
1. Connect to metamask to get account number and ETH balance with just a click of button "Get from metamask"
- wallet.html
- wallet.js

2. Get ETH balance and token balance by inputting account number and contract address into the text field
- index.html
- balance.js
- balanceeth.js
- Adapted from https://github.com/shawntabrizi/ERC20-Token-Balance

  - Idea is to get account number from metamask itself and append into the text field through DOM to generate the eth balance instead of manually inputting the account number

Disclaimer: metamask do not inject web3 anymore 

Notes:
- Short answer is to get user account address from client side, and then retrieve balance of the account for whatever token you are interested in from server side.
- basically there has to be TWO js files
- web3 is server side and window.ethereum is client side
- once u get the account variable it need to pass that wallet address to the server side using DOM
- aka master.js can call window.ethereum then call web3 js
