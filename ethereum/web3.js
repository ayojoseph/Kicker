import Web3 from "web3";

let web3;
//typeof can check if a varible if defined
if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // in the browser
  //takes the web3 copy that was injected from metamask.
  web3 = new Web3(window.web3.currentProvider);
} else {
  //on the server or no metamask
  // sets up own provider that conects to rinkby through infura
  //infura portal url retrieved from deploy.js script
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q"
  );
  web3 = new Web3(provider);
}

//  const web3 = new Web3(window.web3.currentProvider);

export default web3;
