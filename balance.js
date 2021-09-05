window.addEventListener('load', function () {
    if (typeof web3 !== 'undefined') {
        console.log('Web3 Detected! ' + web3.currentProvider.constructor.name)
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('No Web3 Detected... using HTTP Provider')
        window.web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/<APIKEY>"));
    }
})

const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');
const contractECO = "0x169dc01a0873e5a306f83d6b233ca20136c483df";

ethereumButton.addEventListener('click', () => {
    getAccount();
  });

console.log(ethereumButton.src)

//retrieve account from metamask 
async function getAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    // gets the correct ETH wallet from metamask
    console.log(account);
    showAccount.innerHTML = account;
    // Change to connected button
    ethereumButton.src = "Connected.png"
}

const promisify = (inner) =>
    new Promise((resolve, reject) =>
        inner((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    );

async function getBalance() {
    var address, wei, balance
    address = showAccount.innerHTML;
    wei = promisify(cb => web3.eth.getBalance(address, cb))
    try {
        balance = web3.fromWei(await wei, 'ether')
        document.getElementById("showBalance").value = balance.toFixed(5) + " ETH"
        document.getElementById("output").innerHTML = "";
    } catch (error) {
        document.getElementById("output").innerHTML = error;
    }
}

async function getERC20Balance() {
    var address, contractAddress, contractABI, tokenContract, decimals, balance, name, symbol, adjustedBalance
    // address = document.getElementById("address").value
    // contractAddress = document.getElementById("contractAddress").value
    
    address = showAccount.innerHTML
    contractAddress = contractECO
    contractABI = human_standard_token_abi
    
    console.log(address)
    console.log(contractAddress)

    tokenContract = web3.eth.contract(contractABI).at(contractAddress)

    decimals = promisify(cb => tokenContract.decimals(cb))
    balance = promisify(cb => tokenContract.balanceOf(address, cb))
    name = promisify(cb => tokenContract.name(cb))
    symbol = promisify(cb => tokenContract.symbol(cb))

    try {
        adjustedBalance = await balance / Math.pow(10, await decimals)
        document.getElementById("showToken").value = adjustedBalance;
        document.getElementById("showToken").value += " " + await symbol + " (" + await name + ")"
        document.getElementById("showToken").innerHTML = "";
    } catch (error) {
        document.getElementById("output2").innerHTML = error;
    }
}

// getAccount();