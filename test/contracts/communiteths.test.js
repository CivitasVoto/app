const Network = artifacts.require("Network");
const Community = artifacts.require("Community");
const SmartToken = artifacts.require("SmartToken");

const truffleAssert = require("truffle-assertions");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Network", ([deployer]) => {
  // Cross-test instance variables
  let network;
  let result; // Transaction receipt from creating community
  let community;
  let token;

  before(async () => {
    // Instantiate network.
    network = await Network.new();

    // Create community.
    result = await network.createCommunity(
      "Wild Water", // Community Name
      "Access to the water park for 1 month!", // Benefit
      "Waves", // Token Name
      "WAVES", // Token Symbol
      {
        from: deployer // Owner
      }
    );
    const [communityAddress] = await network.getCommunities();

    // Get community and token instances.
    community = await Community.at(communityAddress);
    token = await SmartToken.at(await community.token());
  });

  describe("community creation", () => {
    it("tracks the owner", async () => {
      const owner = await community.owner();
      owner.should.equal(deployer);
    });
    it("tracks the name", async () => {
      const name = await community.name();
      name.should.equal("Wild Water");
    });
    it("tracks the benefit", async () => {
      const benefit = await community.benefit();
      benefit.should.equal("Access to the water park for 1 month!");
    });
    it("tracks the token name", async () => {
      const tokenName = await token.name();
      tokenName.should.equal("Waves");
    });
    it("tracks the token symbol", async () => {
      const tokenSymbol = await token.symbol();
      tokenSymbol.should.equal("WAVES");
    });
    it("emits a CommunityCreated event with the community information", async () => {
      truffleAssert.eventEmitted(result, "CommunityCreated", event => {
        return (
          event.network === network.address &&
          event.community === community.address &&
          event.token === token.address
        );
      });
    });
  });
});
