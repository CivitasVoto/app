const Network = artifacts.require("Network");
const SmartToken = artifacts.require("SmartToken");
const ContractRegistry = artifacts.require("ContractRegistry");
const ContractIds = artifacts.require("ContractIds");
const EtherToken = artifacts.require("EtherToken");
const BancorNetwork = artifacts.require("BancorNetwork");
const BancorConverter = artifacts.require("BancorConverter");
// const NetworkUtils = artifacts.require("NetworkUtils");
// const BancorConverterRegistry = artifacts.require("BancorConverterRegistry");

module.exports = async function(deployer) {
  const contractRegistry = await ContractRegistry.deployed();
  const contractIds = await ContractIds.deployed();
  const bancorNetwork = await BancorNetwork.deployed();
  // const converterRegistry = await BancorConverterRegistry.deployed();

  const CNTSmartToken = await SmartToken.new(
    "CommunitETHs Network Token",
    "CNT",
    18
  );

  await contractRegistry.registerAddress(
    await contractIds.BNT_TOKEN.call(), // Imitate a Network token
    CNTSmartToken.address
  );

  const etherToken = await EtherToken.new();
  await bancorNetwork.registerEtherToken(etherToken.address, true);

  const converter = await BancorConverter.new(
    CNTSmartToken.address, // Smart token governed by converter
    contractRegistry.address,
    10000, // Max conversion fee PPM (1%)
    etherToken.address, // Initial connector token
    200000 // Connector weight PPM (20%)
  );

  // await converterRegistry.registerConverter(
  //   CNTSmartToken.address,
  //   converter.address
  // );

  // await deployer.deploy(NetworkUtils);

  await deployer.deploy(
    Network,
    CNTSmartToken.address,
    contractRegistry.address
    // converterRegistry.address
  );
};
