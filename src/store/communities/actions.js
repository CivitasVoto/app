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
      address,
      name: await community.name(),
      tokenName: await community.tokenName(),
      tokenSymbol: await community.tokenSymbol(),
      price: 1,
      benefit: await community.benefit()
    });
  });
}

export async function create(context, payload) {
  const network = await Network.deployed();
  const [account] = await web3.eth.getAccounts();

  const receipt = await network.createCommunity(...Object.values(payload), {
    from: account
  });

  console.log(receipt);

  // const address = receipt.logs[0].args.communityAddress;

  // context.commit("push", { address, ...payload, price: 1 });

  this.$router.push("/");
}
