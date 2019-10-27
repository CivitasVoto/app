const Network = artifacts.require("Network");
const SmartToken = artifacts.require("SmartToken");
const ContractRegistry = artifacts.require("ContractRegistry");
const ContractIds = artifacts.require("ContractIds");
const EtherToken = artifacts.require("EtherToken");
const BancorNetwork = artifacts.require("BancorNetwork");
const BancorConverter = artifacts.require("BancorConverter");

module.exports = async function(deployer, network, accounts) {
  const account = accounts[0];

  const contractRegistry = await ContractRegistry.deployed();
  const contractIds = await ContractIds.deployed();
  const bancorNetwork = await BancorNetwork.deployed();

  // Create ether token.
  const etherToken = await EtherToken.new();
  await bancorNetwork.registerEtherToken(etherToken.address, true);

  // Create network token.
  const networkToken = await SmartToken.new("Civitas Network Token", "CNT", 18);
  await contractRegistry.registerAddress(
    await contractIds.BNT_TOKEN.call(), // Imitate BNT
    networkToken.address
  );

  // Create converter for network token and ether token.
  const converter = await BancorConverter.new(
    networkToken.address, // Smart token governed by converter
    contractRegistry.address,
    0.1 * 10000, // Max conversion fee PPM (0.1%)
    etherToken.address, // Initial connector token (TODO: Use USDB)
    50 * 10000 // Connector weight PPM (50%)
  );

  // Deposit initial reserve and issue TNT in return.
  await etherToken.deposit({ value: "1000000000000000000" }); // Seed with 1 ETH
  await etherToken.transfer(converter.address, "1000000000000000000");
  await networkToken.issue(account, "2000000000000000000"); // Issue 2 CNT

  // Hand the network token over to the converter.
  await networkToken.transferOwnership(converter.address);
  await converter.acceptTokenOwnership();

  await deployer.deploy(
    Network,
    etherToken.address,
    networkToken.address,
    converter.address
  );
};
