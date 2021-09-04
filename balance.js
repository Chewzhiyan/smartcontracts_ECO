window.addEventListener('load', function () {
    if (typeof web3 !== 'undefined') {
        console.log('Web3 Detected! ' + web3.currentProvider.constructor.name)
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('No Web3 Detected... using HTTP Provider')
        window.web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/<APIKEY>"));
    }
})

const showAccount = document.querySelector('.showAccount');

//retrieve account from metamask 
async function getAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    // gets the correct ETH wallet from metamask
    console.log(account);
    showAccount.innerHTML = account;

    // const balance = await ethereum.request({ method: 'eth_getBalance', params: ["0xF36EAE3B23009fB9D1864B4377605aD2e667EFd4","latest"], "id":1 });
    const balance = await ethereum.request({ method: 'eth_getBalance', params: [account,"latest"], "id":1 });
    // const tbalance = await ethereum.request({ method: 'eth_call', params: [{"to":"0x169dc01a0873e5a306f83d6b233ca20136c483df", "data":"0x169dc01a0873e5a306f83d6b233ca20136c483df"},"latest"], "id":1 });

    function roughScale(x, base) {
    const parsed = parseInt(x, base);
    if (isNaN(parsed)) { return 0; }
    return parsed / (10**18);
    }
    showBalance.value = roughScale(balance).toFixed(5);
    
}

getAccount();

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
    address = document.getElementById("showBalance").value;
    wei = promisify(cb => web3.eth.getBalance(address, cb))
    try {
        balance = web3.fromWei(await wei, 'ether')
        document.getElementById("output").innerHTML = balance + " ETH";
    } catch (error) {
        document.getElementById("output").innerHTML = error;
    }
}
async function getERC20Balance() {
    var address, contractAddress, contractABI, tokenContract, decimals, balance, name, symbol, adjustedBalance
    address = document.getElementById("address").value
    contractAddress = document.getElementById("contractAddress").value
    contractABI = human_standard_token_abi

    tokenContract = web3.eth.contract(contractABI).at(contractAddress)

    decimals = promisify(cb => tokenContract.decimals(cb))
    balance = promisify(cb => tokenContract.balanceOf(address, cb))
    name = promisify(cb => tokenContract.name(cb))
    symbol = promisify(cb => tokenContract.symbol(cb))

    try {
        adjustedBalance = await balance / Math.pow(10, await decimals)
        document.getElementById("output2").innerHTML = adjustedBalance;
        document.getElementById("output2").innerHTML += " " + await symbol + " (" + await name + ")";
    } catch (error) {
        document.getElementById("output2").innerHTML = error;
    }
}