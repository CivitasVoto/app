import Web3 from "web3";

let web3;

// Modern dapp browsers...
if (window.ethereum) {
  web3 = new Web3(ethereum);
  try {
    // Request account access if needed
    ethereum.enable();
  } catch (error) {
    // User denied account access...
  }
}
// Legacy dapp browsers...
else if (window.web3) {
  web3 = new Web3(web3.currentProvider);
}
// Non-dapp browsers...
else {
  console.log(
    "Non-Ethereum browser detected. You should consider trying MetaMask!"
  );
}

export { web3 };

export default async ({ Vue }) => {
  Vue.prototype.$web3 = web3;
};
