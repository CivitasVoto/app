const ContractRegistry = artifacts.require("ContractRegistry");
const ContractIds = artifacts.require("ContractIds");
const ContractFeatures = artifacts.require("ContractFeatures");
const BancorGasPriceLimit = artifacts.require("BancorGasPriceLimit");
const BancorFormula = artifacts.require("BancorFormula");
const NonStandardTokenRegistry = artifacts.require("NonStandardTokenRegistry");
const BancorNetwork = artifacts.require("BancorNetwork");
// const BancorConverterRegistry = artifacts.require("BancorConverterRegistry");

module.exports = async function(deployer, network, accounts) {
  const account = accounts[0];

  // ContractRegistry
  await deployer.deploy(ContractRegistry);
  const contractRegistry = await ContractRegistry.deployed();

  // ContractIds
  await deployer.deploy(ContractIds);
  const contractIds = await ContractIds.deployed();

  // ContractFeatures
  await deployer.deploy(ContractFeatures);
  const contractFeatures = await ContractFeatures.deployed();
  const contractFeaturesId = await contractIds.CONTRACT_FEATURES.call();
  await contractRegistry.registerAddress(
    contractFeaturesId,
    contractFeatures.address
  );

  // BancorGasPriceLimit
  await deployer.deploy(
    BancorGasPriceLimit,
    BancorGasPriceLimit.class_defaults.gasPrice
  );
  const gasPriceLimit = await BancorGasPriceLimit.deployed();
  const gasPriceLimitId = await contractIds.BANCOR_GAS_PRICE_LIMIT.call();
  await contractRegistry.registerAddress(
    gasPriceLimitId,
    gasPriceLimit.address
  );

  // BancorFormula
  await deployer.deploy(BancorFormula);
  const formula = await BancorFormula.deployed();
  const formulaId = await contractIds.BANCOR_FORMULA.call();
  await contractRegistry.registerAddress(formulaId, formula.address);

  // NonStandardTokenRegistry
  await deployer.deploy(NonStandardTokenRegistry);
  const nonStandardTokenRegistry = await NonStandardTokenRegistry.deployed();
  const nonStandardTokenRegistryId = await contractIds.NON_STANDARD_TOKEN_REGISTRY.call();
  await contractRegistry.registerAddress(
    nonStandardTokenRegistryId,
    nonStandardTokenRegistry.address
  );

  // BancorConverterRegistry
  // await deployer.deploy(BancorConverterRegistry);

  // BancorNetwork
  await deployer.deploy(BancorNetwork, contractRegistry.address);
  const bancorNetwork = await BancorNetwork.deployed();
  const bancorNetworkId = await contractIds.BANCOR_NETWORK.call();
  await contractRegistry.registerAddress(
    bancorNetworkId,
    bancorNetwork.address
  );
  await bancorNetwork.setSignerAddress(account);
};
