import { web3 } from "boot/web3";
import contract from "truffle-contract";

import NetworkABI from "src/abis/Network";
import BancorConverterABI from "src/abis/BancorConverter";

const Network = contract(NetworkABI);
const BancorConverter = contract(BancorConverterABI);

Network.setProvider(web3.currentProvider);
BancorConverter.setProvider(web3.currentProvider);

export async function convert(context, payload) {
  const [account] = await web3.eth.getAccounts();
  const network = await Network.deployed();
  const networkToken = await network.networkToken();
  const converter = await BancorConverter.at(await network.converter());

  const path = [payload.sendToken, networkToken, payload.receiveToken];

  const expectedReturn = await converter.getReturn(
    payload.sendToken, // From
    payload.receiveToken, // To
    payload.amount // Amount
  );

  await converter.quickConvert(
    path, // Path
    payload.amount, // Amount
    expectedReturn[0], // Min return
    {
      from: account,
      value: payload.sendingETH ? payload.amount : 0
    }
  );
}
