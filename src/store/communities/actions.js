import { web3 } from "boot/web3";
import contract from "truffle-contract";
import NetworkABI from "src/abis/Network";
import CommunityABI from "src/abis/Community";

const Network = contract(NetworkABI);
const Community = contract(CommunityABI);
Network.setProvider(web3.currentProvider);
Community.setProvider(web3.currentProvider);

export async function initialize(context) {
  const network = await Network.deployed();
  const addresses = await network.getAllCommunities();

  addresses.forEach(async address => {
    const community = await Community.at(address);

    context.commit("push", {
      name: await community.name(),
      tokenName: await community.tokenName(),
      tokenSymbol: await community.tokenSymbol(),
      tokenInitialPrice: await community.tokenInitialPrice(),
      benefit: await community.benefit()
    });
  });
}

export async function create(context, payload) {
  const network = await Network.deployed();
  const [account] = await web3.eth.getAccounts();

  await network.createCommunity(...Object.values(payload), {
    from: account
  });

  context.commit("push", payload);

  this.$router.push("/");
}
