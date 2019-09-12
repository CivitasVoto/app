const Network = artifacts.require("Network");

module.exports = function(deployer) {
  deployer.deploy(Network);
};
