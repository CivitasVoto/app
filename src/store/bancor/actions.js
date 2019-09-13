import { web3 } from "boot/web3";
import contract from "truffle-contract";

import NetworkABI from "src/abis/Network";
import BancorConverterABI from "src/abis/BancorConverter";

const Network = contract(NetworkABI);
const BancorConverter = contract(BancorConverterABI);

Network.setProvider(web3.currentProvider);
BancorConverter.setProvider(web3.currentProvider);

export async function ETHTNTBuy(/*context, payload*/) {
  const [account] = await web3.eth.getAccounts();
  const network = await Network.deployed();
  const etherToken = await network.etherToken();
  const networkToken = await network.networkToken();
  const converter = await BancorConverter.at(await network.converter());

  // console.log(networkToken);
  const ETHTNTBuyPath = [etherToken, networkToken, networkToken];

  // const expectedReturn = await converter.getReturn(
  //   etherToken, // From
  //   networkToken, // To
  //   100000000000000000 // Amount
  // );

  await converter.quickConvert(
    ETHTNTBuyPath, // Path
    "1000000000000000000", // Amount
    1,
    {
      from: account,
      value: 1000000000000000000
    }
  );
}

export async function TNTCOMBuy(/*context, payload*/) {
  const [account] = await web3.eth.getAccounts();
  const network = await Network.deployed();
  const networkToken = await network.networkToken();
  const converter = await BancorConverter.at(await network.converter());

  // console.log(networkToken);
  const TNTCOMBuyPath = [
    networkToken,
    "0x4Bf7ef934E41D43a8339B4331C2b04e84a9fd487",
    "0x4Bf7ef934E41D43a8339B4331C2b04e84a9fd487"
  ];

  // const expectedReturn = await converter.getReturn(
  //   etherToken, // From
  //   networkToken, // To
  //   100000000000000000 // Amount
  // );

  await converter.quickConvert(
    TNTCOMBuyPath, // Path
    100, // Amount
    1,
    {
      from: account
    }
  );
}
