const Network = artifacts.require("Network");
const Community = artifacts.require("Community");

const truffleAssert = require("truffle-assertions");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Community", ([deployer]) => {
  let network;
  let result;
  let community;

  beforeEach(async () => {
    network = await Network.new();
    result = await network.createCommunity(
      "Wild Water", // Title
      "Waves", // Token Name
      "WAVES", // Token Symbol
      200, // Initial Price
      "Access to the water park for 1 month!", // Benefit
      {
        from: deployer // Owner
      }
    );
    const [communityAddress] = await network.getAllCommunities();
    community = await Community.at(communityAddress);
  });

  describe("creation", () => {
    it("tracks the network", async () => {
      const communityNetwork = await community.network();
      communityNetwork.should.equal(network.address);
    });
    it("tracks the owner", async () => {
      const owner = await community.owner();
      owner.should.equal(deployer);
    });
    it("tracks the title", async () => {
      const title = await community.title();
      title.should.equal("Wild Water");
    });
    it("tracks the token name", async () => {
      const tokenName = await community.tokenName();
      tokenName.should.equal("Waves");
    });
    it("tracks the token symbol", async () => {
      const tokenSymbol = await community.tokenSymbol();
      tokenSymbol.should.equal("WAVES");
    });
    it("tracks the initial price", async () => {
      const initialPrice = await community.initialPrice();
      initialPrice.toString().should.equal("200");
    });
    it("tracks the benefit", async () => {
      const benefit = await community.benefit();
      benefit.should.equal("Access to the water park for 1 month!");
    });
    it("emits a CommunityCreated event with the community title", async () => {
      truffleAssert.eventEmitted(result, "CommunityCreated", community => {
        return community.title === "Wild Water";
      });
    });
  });
});
