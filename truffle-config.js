const HDWalletProvider = require("truffle-hdwallet-provider");
const infuraKey = "fd41d288d6cc45b1933a89b788a0fa63";

const mnemonic =
  "sight valid real punch history tumble board oval bitter cover code protect";

module.exports = {
  // Set contract directories
  contracts_build_directory: "src/abis",
  test_directory: "test/contracts",

  // Configure networks
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://ropsten.infura.io/v3/${infuraKey}`
        ),
      network_id: 3,
      gas: 22000000000,
      skipDryRun: true
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure compilers
  compilers: {
    solc: {
      version: "0.4.26", // Fetch exact version from solc-bin (default: truffle's version)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "byzantium"
      }
    }
  }
};
