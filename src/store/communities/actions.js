import { web3 } from "boot/web3";
import contract from "truffle-contract";

import NetworkABI from "src/abis/Network";
import CommunityABI from "src/abis/Community";
import SmartTokenABI from "src/abis/SmartToken";

const Network = contract(NetworkABI);
const Community = contract(CommunityABI);
const SmartToken = contract(SmartTokenABI);

Network.setProvider(web3.currentProvider);
Community.setProvider(web3.currentProvider);
SmartToken.setProvider(web3.currentProvider);

export async function initialize(context) {
  const network = await Network.deployed();
  const addresses = await network.getCommunities();

  addresses.forEach(async address => {
    const community = await Community.at(address);
    const token = await SmartToken.at(await community.token());

    context.commit("addCommunity", {
      community: {
        address,
        name: await community.name(),
        tokenName: await token.name(),
        tokenSymbol: await token.symbol(),
        tokenAddress: await community.token(),
        owner: await community.owner(),
        members: await community.getMembers()
      }
    });
  });
}

export async function createCommunity(context, payload) {
  const network = await Network.deployed();
  const [account] = await web3.eth.getAccounts();

  const receipt = await network.createCommunity(
    ...Object.values(payload.community),
    {
      from: account
    }
  );
  const community = await Community.at(receipt.logs[0].args.community);
  const token = await SmartToken.at(await community.token());

  context.commit("addCommunity", {
    community: {
      address: community.address,
      name: await community.name(),
      tokenName: await token.name(),
      tokenSymbol: await token.symbol(),
      tokenAddress: await community.token(),
      members: await community.getMembers()
    }
  });

  context.commit("addMember", {
    community: community.address,
    member: account
  });

  return community.address;
}

export async function addConnector(context, payload) {
  const community = await Community.at(payload.community.address);
  const network = await Network.deployed();
  const [account] = await web3.eth.getAccounts();
  const networkToken = await SmartToken.at(await network.networkToken());

  await networkToken.approve(
    community.address,
    web3.utils.toWei(payload.converter.amountToDeposit.toString()), // Approve amount of tokens to deposit
    {
      from: account
    }
  );

  await community.initializeConnector(
    network.address,
    web3.utils.toWei(payload.converter.amountToMint.toString()), // Set amount of tokens to mint
    payload.converter.reserveRatio, // Set reserve ratio
    web3.utils.toWei(payload.converter.amountToDeposit.toString()), // Set amount of tokens to deposit
    {
      from: account
    }
  );

  this.$router.push(`/communities/${community.address}`);
}

export async function join(context, payload) {
  const network = await Network.deployed();
  const [account] = await web3.eth.getAccounts();

  await network.joinCommunity(payload.community, { from: account });

  context.commit("addMember", {
    community: payload.community,
    member: account
  });

  this.$router.push(`/communities/${payload.community}`);
}
