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
  const addresses = await network.getAllCommunities();

  addresses.forEach(async address => {
    const community = await Community.at(address);
    const token = await SmartToken.at(await community.token());

    context.commit("push", {
      address,
      name: await community.name(),
      benefit: await community.benefit(),
      tokenName: await token.name(),
      tokenSymbol: await token.symbol(),
      price: 1
    });
  });
}

export async function create(context, payload) {
  const network = await Network.deployed();
  const [account] = await web3.eth.getAccounts();

  const receipt = await network.createCommunity(...Object.values(payload), {
    from: account
  });

  const address = receipt.logs[0].args.community;

  context.commit("push", { address, ...payload, price: 1 });

  this.$router.push("/");
}
