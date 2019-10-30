import { web3 } from "boot/web3";
import contract from "truffle-contract";

import NetworkABI from "src/abis/Network";
import CommunityABI from "src/abis/Community";
import BancorConverterABI from "src/abis/BancorConverter";
import SmartTokenABI from "src/abis/SmartToken";

const Network = contract(NetworkABI);
const Community = contract(CommunityABI);
const BancorConverter = contract(BancorConverterABI);
const SmartToken = contract(SmartTokenABI);

Network.setProvider(web3.currentProvider);
Community.setProvider(web3.currentProvider);
BancorConverter.setProvider(web3.currentProvider);
SmartToken.setProvider(web3.currentProvider);

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
    const network = await Network.deployed();
    const networkToken = await SmartToken.at(await network.networkToken());

    converter = await BancorConverter.at(await community.converter());
    path = [payload.sendToken, payload.receiveToken, payload.receiveToken];

    await networkToken.approve(
      converter.address,
      web3.utils.toWei(payload.amount.toString()), // Approve amount of tokens to deposit
      {
        from: account
      }
    );
  } else {
    const network = await Network.deployed();
    converter = await BancorConverter.at(await network.converter());
    path = [payload.sendToken, payload.sendToken, payload.receiveToken];
  }

  // const expectedReturn = await converter.getReturn(
  //   payload.sendToken, // From
  //   payload.receiveToken, // To
  //   payload.amount // Amount
  // );

  await converter.quickConvert(
    path, // Path
    web3.utils.toWei(payload.amount), // Amount
    // expectedReturn[0], // Min return
    1,
    {
      from: account,
      value: payload.sendingETH ? web3.utils.toWei(payload.amount) : 0
    }
  );
}

export async function getReturn(context, payload) {
  let converter;

  if (payload.sendingETH) {
    const network = await Network.deployed();
    converter = await BancorConverter.at(await network.converter());
  } else if (payload.sendingCommunityToken) {
    const community = await Community.at(payload.sendCommunity.address);
    converter = await BancorConverter.at(await community.converter());
  } else if (payload.receivingCommunityToken) {
    const community = await Community.at(payload.receiveCommunity.address);
    converter = await BancorConverter.at(await community.converter());
  } else {
    const network = await Network.deployed();
    converter = await BancorConverter.at(await network.converter());
  }

  return await converter.getReturn(
    payload.sendToken, // From
    payload.receiveToken, // To
    web3.utils.toWei(payload.amount) // Amount
  );
}
