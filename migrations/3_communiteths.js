const Network = artifacts.require("Network");
const SmartToken = artifacts.require("SmartToken");
const ContractRegistry = artifacts.require("ContractRegistry");
const ContractIds = artifacts.require("ContractIds");
const EtherToken = artifacts.require("EtherToken");
const BancorNetwork = artifacts.require("BancorNetwork");
const BancorConverter = artifacts.require("BancorConverter");

module.exports = async function(deployer) {
  deployer.deploy(Network);
  const contractRegistry = await ContractRegistry.deployed();
  const contractIds = await ContractIds.deployed();
  const bancorNetwork = await BancorNetwork.deployed();

  const CNTSmartToken = await SmartToken.new(
    "CommunitETHs Network Token",
    "CNT",
    18
  );

  await contractRegistry.registerAddress(
    await contractIds.BNT_TOKEN.call(),
    CNTSmartToken.address
  );

  const etherToken = await EtherToken.new();
  await bancorNetwork.registerEtherToken(etherToken.address, true);

  await BancorConverter.new(
    CNTSmartToken.address, // Smart token governed by converter
    contractRegistry.address,
    10000, // Max conversion fee PPM (1%)
    etherToken.address, // Initial connector token
    200000 // Connector weight PPM (20%)
  );
};
