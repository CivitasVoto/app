const Network = artifacts.require("Network");
const Community = artifacts.require("Community");

const EtherToken = artifacts.require("EtherToken");
const SmartToken = artifacts.require("SmartToken");
const ContractIds = artifacts.require("ContractIds");
const BancorNetwork = artifacts.require("BancorNetwork");
const TestNonStandardERC20Token = artifacts.require(
  "TestNonStandardERC20Token"
);
const BancorConverter = artifacts.require("BancorConverter");
const ContractRegistry = artifacts.require("ContractRegistry");
const NonStandardTokenRegistry = artifacts.require("NonStandardTokenRegistry");

const truffleAssert = require("truffle-assertions");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Network", ([deployer, bancorTester]) => {
  // Cross-test instance variables
  let network;
  let result; // Transaction receipt from creating community
  let community;
  let token;

  let contractIds;
  let bancorNetwork;
  let contractRegistry;
  let nonStandardTokenRegistry;

  before(async () => {
    // Instantiate network.
    network = await Network.deployed();

    contractIds = await ContractIds.deployed();
    bancorNetwork = await BancorNetwork.deployed();
    contractRegistry = await ContractRegistry.deployed();
    nonStandardTokenRegistry = await NonStandardTokenRegistry.deployed();

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

  describe("bancor", () => {
    it("allows for community token conversions", async () => {
      etherToken = await EtherToken.new();
      await etherToken.deposit({ value: 10000000 });

      await bancorNetwork.registerEtherToken(etherToken.address, true);

      const CNTSmartToken = await SmartToken.new(
        "CommunitETHs Network Token",
        "CNT",
        18
      );

      await CNTSmartToken.issue(deployer, 100000);

      await contractRegistry.registerAddress(
        await contractIds.BNT_TOKEN.call(),
        CNTSmartToken.address
      );

      let converter = await BancorConverter.new(
        CNTSmartToken.address, // Smart token governed by converter
        contractRegistry.address,
        10000, // Max conversion fee (1%)
        etherToken.address, // Initial connector token
        200000 // Connector weight PPM (20%)
      );

      const DAIToken = await TestNonStandardERC20Token.new(
        "DAI Stablecoin",
        "DAI",
        78993850 // Circulating supply of DAI
      );

      await nonStandardTokenRegistry.setAddress(DAIToken.address, true);

      let converter = await BancorConverter.new(
        CNTSmartToken.address, // Smart token governed by converter
        contractRegistry.address,
        10000, // Max conversion fee (1%)
        DAIToken.address,
        1000000 // Connector weight PPM (100%)
      );

      await converter.addConnector(
        DAIToken.address,
        800000, // Connector weight PPM (80%)
        false // Enable virtual balance?
      );

      await etherToken.transfer(converter.address, 50000);
      await DAIToken.transfer(converter.address, 50000);

      await CNTSmartToken.transferOwnership(converter.address);
      await converter.acceptTokenOwnership();

      ETHCNTBuyPath = [
        etherToken.address,
        CNTSmartToken.address,
        CNTSmartToken.address
      ];

      const prevBalance = await CNTSmartToken.balanceOf.call(bancorTester);

      const expectedReturn = await converter.getReturn(
        etherToken.address, // From
        CNTSmartToken.address, // To
        100 // Amount
      );

      const minReturn = expectedReturn[0];
      // const conversionFee = expectedReturn[1];

      await converter.quickConvert(
        ETHCNTBuyPath, // Path
        100, // Amount
        minReturn,
        {
          from: bancorTester,
          value: 100
        }
      );
      const newBalance = await CNTSmartToken.balanceOf.call(bancorTester);

      assert.isAbove(
        newBalance.toNumber(),
        prevBalance.toNumber(),
        "new balance isn't higher than previous balance"
      );

      DAICNTBuyPath = [
        DAIToken.address,
        CNTSmartToken.address,
        CNTSmartToken.address
      ];

      await DAIToken.transfer(bancorTester, 100);
      await DAIToken.approve(converter.address, 100, { from: bancorTester });

      const prevBalance2 = await CNTSmartToken.balanceOf.call(bancorTester);

      const expectedReturn2 = await converter.getReturn(
        DAIToken.address, // From
        CNTSmartToken.address, // To
        100 // Amount
      );

      const minReturn2 = expectedReturn2[0];
      // const conversionFee = expectedReturn[1];

      await converter.quickConvert(
        DAICNTBuyPath, // Path
        100, // Amount
        minReturn2,
        {
          from: bancorTester
        }
      );
      const newBalance2 = await CNTSmartToken.balanceOf.call(bancorTester);

      assert.isAbove(
        newBalance2.toNumber(),
        prevBalance2.toNumber(),
        "new balance isn't higher than previous balance"
      );
    });
  });
});
