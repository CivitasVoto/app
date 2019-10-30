import { web3 } from "boot/web3";
import contract from "truffle-contract";

import NetworkABI from "src/abis/Network";
import CommunityABI from "src/abis/Community";
import BancorConverterABI from "src/abis/BancorConverter";

const Network = contract(NetworkABI);
const Community = contract(CommunityABI);
const BancorConverter = contract(BancorConverterABI);

Network.setProvider(web3.currentProvider);
Community.setProvider(web3.currentProvider);
BancorConverter.setProvider(web3.currentProvider);

export async function convert(context, payload) {
  const [account] = await web3.eth.getAccounts();
  let converter;
  let path;

  if (payload.sendingETH) {
    const network = await Network.deployed();
    const networkToken = await network.networkToken();
    converter = await BancorConverter.at(await network.converter());
    path = [payload.sendToken, networkToken, payload.receiveToken];
  } else if (payload.sendingCommunityToken) {
    const community = await Community.at(payload.sendCommunity.address);
    converter = await BancorConverter.at(await community.converter());
    path = [payload.sendToken, payload.sendToken, payload.receiveToken];
  } else if (payload.receivingCommunityToken) {
    const community = await Community.at(payload.receiveCommunity.address);
    converter = await BancorConverter.at(await community.converter());
    path = [payload.sendToken, payload.receiveToken, payload.receiveToken];
  } else {
    const network = await Network.deployed();
    const networkToken = await network.networkToken();
    converter = await BancorConverter.at(await network.converter());
    path = [payload.sendToken, networkToken, payload.receiveToken];
  }

  // const expectedReturn = await converter.getReturn(
  //   payload.sendToken, // From
  //   payload.receiveToken, // To
  //   payload.amount // Amount
  // );

  await converter.quickConvert(
    path, // Path
    payload.amount, // Amount
    // expectedReturn[0], // Min return
    1,
    {
      from: account,
      value: payload.sendingETH ? payload.amount : 0
    }
  );
}
