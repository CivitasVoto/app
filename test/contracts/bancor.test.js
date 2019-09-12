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

contract("BancorConverter", ([deployer, bancorTester]) => {
  let contractIds;
  let bancorNetwork;
  let contractRegistry;
  let nonStandardTokenRegistry;
  let etherToken;
  let DAIToken;
  let CNTSmartToken;
  let converter;

  before(async () => {
    contractIds = await ContractIds.deployed();
    bancorNetwork = await BancorNetwork.deployed();
    contractRegistry = await ContractRegistry.deployed();
    nonStandardTokenRegistry = await NonStandardTokenRegistry.deployed();

    etherToken = await EtherToken.new();
    await etherToken.deposit({ value: 107706655 });

    await bancorNetwork.registerEtherToken(etherToken.address, true);

    CNTSmartToken = await SmartToken.new(
      "CommunitETHs Network Token",
      "CNT",
      18
    );

    await CNTSmartToken.issue(deployer, 100000);

    await contractRegistry.registerAddress(
      await contractIds.BNT_TOKEN.call(),
      CNTSmartToken.address
    );

    converter = await BancorConverter.new(
      CNTSmartToken.address, // Smart token governed by converter
      contractRegistry.address,
      10000, // Max conversion fee (1%)
      etherToken.address, // Initial connector token
      200000 // Connector weight PPM (20%)
    );

    DAIToken = await TestNonStandardERC20Token.new(
      "DAI Stablecoin",
      "DAI",
      78993850 // Circulating supply of DAI
    );

    await nonStandardTokenRegistry.setAddress(DAIToken.address, true);

    await converter.addConnector(
      DAIToken.address,
      800000, // Connector weight PPM (80%)
      false // Enable virtual balance?
    );

    await etherToken.transfer(converter.address, 50000);
    await DAIToken.transfer(converter.address, 50000);

    await CNTSmartToken.transferOwnership(converter.address);
    await converter.acceptTokenOwnership();
  });

  describe("bancor", () => {
    it("allows for purchase of Smart Token from Ether token", async () => {
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
    });

    it("allows for purchase of Smart Token from non standard ERC20 token", async () => {
      DAICNTBuyPath = [
        DAIToken.address,
        CNTSmartToken.address,
        CNTSmartToken.address
      ];

      await DAIToken.transfer(bancorTester, 100);
      await DAIToken.approve(converter.address, 100, { from: bancorTester });

      const prevBalance = await CNTSmartToken.balanceOf.call(bancorTester);

      const expectedReturn = await converter.getReturn(
        DAIToken.address, // From
        CNTSmartToken.address, // To
        100 // Amount
      );

      const minReturn = expectedReturn[0];
      // const conversionFee = expectedReturn[1];

      await converter.quickConvert(
        DAICNTBuyPath, // Path
        100, // Amount
        minReturn,
        {
          from: bancorTester
        }
      );
      const newBalance = await CNTSmartToken.balanceOf.call(bancorTester);

      assert.isAbove(
        newBalance.toNumber(),
        prevBalance.toNumber(),
        "new balance isn't higher than previous balance"
      );
    });

    it("allows for sale of Smart Token to non standard ERC20 token", async () => {
      DAICNTSellPath = [
        CNTSmartToken.address,
        CNTSmartToken.address,
        DAIToken.address
      ];

      const prevBalance = await CNTSmartToken.balanceOf.call(bancorTester);

      const expectedReturn = await converter.getReturn(
        CNTSmartToken.address, // To
        DAIToken.address, // From
        10 // Amount
      );

      const minReturn = expectedReturn[0];
      // const conversionFee = expectedReturn[1];

      await converter.quickConvert(
        DAICNTSellPath, // Path
        10, // Amount
        minReturn,
        {
          from: bancorTester
        }
      );
      const newBalance = await CNTSmartToken.balanceOf.call(bancorTester);

      assert.isAbove(
        prevBalance.toNumber(),
        newBalance.toNumber(),
        "new balance isn't lower than previous balance"
      );
    });

    it("allows for sale of Smart Token to ether token", async () => {
      ETHCNTSellPath = [
        CNTSmartToken.address,
        CNTSmartToken.address,
        etherToken.address
      ];

      const prevBalance = await CNTSmartToken.balanceOf.call(bancorTester);

      const expectedReturn = await converter.getReturn(
        CNTSmartToken.address, // To
        etherToken.address, // From
        10 // Amount
      );

      const minReturn = expectedReturn[0];
      // const conversionFee = expectedReturn[1];

      await converter.quickConvert(
        ETHCNTSellPath, // Path
        10, // Amount
        minReturn,
        {
          from: bancorTester
        }
      );
      const newBalance = await CNTSmartToken.balanceOf.call(bancorTester);

      assert.isAbove(
        prevBalance.toNumber(),
        newBalance.toNumber(),
        "new balance isn't lower than previous balance"
      );
    });
  });
});
