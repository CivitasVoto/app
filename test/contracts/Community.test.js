const Community = artifacts.require("Community");

const truffleAssert = require("truffle-assertions");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Community", ([deployer]) => {
  let community;

  beforeEach(async () => {
    community = await Community.new(
      "Wild Water", // Name
      "Aqua", // Token Name
      "AQUA", // Token Symbol
      200, // Initial Price
      "Access to the water park for 1 month!" // Benefit
    );
  });

  describe("creation", () => {
    it("tracks the owner", async () => {
      const owner = await community.owner();
      owner.should.equal(deployer);
    });
    it("tracks the name", async () => {
      const name = await community.name();
      name.should.equal("Wild Water");
    });
    it("tracks the token name", async () => {
      const tokenName = await community.tokenName();
      tokenName.should.equal("Aqua");
    });
    it("tracks the token symbol", async () => {
      const tokenSymbol = await community.tokenSymbol();
      tokenSymbol.should.equal("AQUA");
    });
    it("tracks the initial price", async () => {
      const initialPrice = await community.initialPrice();
      initialPrice.toString().should.equal("200");
    });
    it("tracks the benefit", async () => {
      const benefit = await community.benefit();
      benefit.should.equal("Access to the water park for 1 month!");
    });
    it("emits a Created event with the community name", async () => {
      const result = await truffleAssert.createTransactionResult(
        community,
        community.transactionHash
      );
      truffleAssert.eventEmitted(result, "Created", event => {
        return event.name === "Wild Water";
      });
    });
  });
});
