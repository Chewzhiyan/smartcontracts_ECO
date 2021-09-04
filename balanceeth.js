// const { get } = require("https");

// connect html with javascript for button and text
// const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');

// Eunice help with this DOM manipulation
// {insert code here}


// ethereumButton.addEventListener('click', () => {
//   getAccount();
//   console.log(account);
// });

//retrieve account from metamask 
async function getAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  // gets the correct ETH wallet from metamask
  console.log(account);
  showAccount.innerHTML = account;

  // Eunice please append textbox value  = account;
  // {insert code here}
  
  // //const balance = await ethereum.request({ method: 'eth_getBalance', params: ["0xF36EAE3B23009fB9D1864B4377605aD2e667EFd4","latest"], "id":1 });
   const balance = await ethereum.request({ method: 'eth_getBalance', params: [account,"latest"], "id":1 });
  // // const balance = await ethereum.request({ method: 'eth_call', params: [{"to":"0x169dc01a0873e5a306f83d6b233ca20136c483df", "data":"0x169dc01a0873e5a306f83d6b233ca20136c483df"},"latest"], "id":1 });

  function roughScale(x, base) {
    const parsed = parseInt(x, base);
    if (isNaN(parsed)) { return 0; }
    return parsed / (10**18);
  }
  showBalance.value = roughScale(balance).toFixed(5);

  // showBalance.value = balance;
}

getAccount();
