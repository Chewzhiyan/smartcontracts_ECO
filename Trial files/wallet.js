// connect html with javascript for button and text
const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');
const showBalance = document.querySelector('.showBalance');

ethereumButton.addEventListener('click', () => {
  getAccount();
});

//retrieve account from metamask 
async function getAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  // gets the correct ETH wallet from metamask
  showAccount.innerHTML = account;
  
  //get balance using retrieved account from eth_requestAccounts
  //const balance = await ethereum.request({ method: 'eth_getBalance', params: ["0xF36EAE3B23009fB9D1864B4377605aD2e667EFd4","latest"], "id":1 }); - hard coded
   const balance = await ethereum.request({ method: 'eth_getBalance', params: [account,"latest"], "id":1 });
  // const balance = await ethereum.request({ method: 'eth_call', params: [{"to":"0x169dc01a0873e5a306f83d6b233ca20136c483df", "data":"0x169dc01a0873e5a306f83d6b233ca20136c483df"},"latest"], "id":1 }); - error balance

  //convert hexstring into decimal
  function roughScale(x, base) {
    const parsed = parseInt(x, base);
    if (isNaN(parsed)) { return 0; }
    return parsed / (10**18);
  }
  showBalance.innerHTML = roughScale(balance).toFixed(5);
}