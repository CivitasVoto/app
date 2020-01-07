# Civitas

## Overview

Civitas is a coordination platform for bootstrapping communities to get work done! Anyone in the world can launch a community and its [Smart Token](https://support.bancor.network/hc/en-us/articles/360000472072-How-does-a-Smart-Token-work-) which (by holding the Civitas Network’s [Liquid Token](https://support.bancor.network/hc/en-us/articles/360000457992-What-is-a-Liquid-Token-) in reserve) is tradable with any other community token or Ethereum token in the Bancor Network; a beneficial side effect being that the market price for a community token is [automatically valuated](https://support.bancor.network/hc/en-us/articles/360000503372-How-does-automatic-pricing-and-market-making-work-) based on the overall value of the network - incentivizing cooperation between communities to increase the value of the network.

Once a community and its token are established, community members vote to distribute community funds generated from [recurring membership dues](https://1337alliance.com/) to projects using [meritocratic governance](https://blog.colony.io/the-colony-reputation-system-5616293c3949/). This encourages members to contribute to gain a voice in the direction and decision making of a community.

## Goals

I. Allow anyone in the world to create a community of value

II. Allow anyone in the world to complete work for a community

III. Allow anyone in the world to participate in a community’s economy by purchasing or earning a community’s token

IV. Allow anyone in the world to participate in a community’s governance by earning reputation (which represents their voting weight) from completing work

## Specifications

By standing on the shoulders of giants in open source we get a lot out of the box. Many primitives of Civitas already exist in standalone components that, when combined, realize the platform. These components include:

### [Bancor](https://about.bancor.network/protocol/)

The economy of the network - provides continuous fundraising and liquidity for a community. Also automatically valuates community token prices and allows for swapping tokens within and outside of the Civitas Network based on the value of those currencies.

### [Colony](https://colony.io/)

The workforce of the network - community project owners create bounties to be paid in a community’s token, held in escrow until the task is completed. Contributors earn reputation equal to the monetary value of a task.

### [Aragon](https://aragon.org/)

The foundation of communities - reputation holders create and vote on proposals to: allocate funds to projects, change membership dues, signal community decisions, revoke membership, ad infinitum. This can be extended for specific use cases by installing and/or configuring existing arApps.

## Release Milestones

I. Network of Communities (COMPLETE)

- Launch communities with a bonding curve fundraising token

- Swap community tokens with other tokens in/outside the network

II. Community Fund Allocation

- Members spearhead grant proposals for projects to be funded from the community fund

- Vote on proposals using [Holographic Consensus](https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c) weighted by a member's reputation

III. Community Projects and Tasks

- Once funded, project owners create and payout tasks with the funding

- Contributors earn reputation from completing tasks effectively

## Post Release Milestones

IV. Legal Communities

- Integrate OpenLaw legal contracts to incorporate a community as an LLC

V. Much, much more…

- Aragon Chain communities, compound.finance pools, and more to be announced!

## Demand and Advantages

The need for community governed funds distribution to sustain coordination efforts is a [hot topic in the Ethereum community](https://medium.com/streamrblog/a-proposal-for-ethereum-voting-mechanisms-and-common-funds-distribution-f637eb2515b1) and also extends far beyond the blockchain realm. One highly anticipated example includes [The LOA](https://medium.com/coinmonks/venturing-into-the-lao-comparing-molochdao-and-vmlao-solidity-designs-81da2361dba5) (built on [Moloch](https://medium.com/@simondlr/the-moloch-dao-collapsing-the-firm-2a800b3aa2e7)) which serves as a fundamental experiment of permissioned membership and fund distribution but is limited by the opinionated nature of Moloch.

Civitas utilizes battle tested platforms such as [Bancor](https://about.bancor.network/protocol/), [Colony](https://colony.io/), and [Aragon](https://aragon.org/) to compose a modular, configurable, and extendable DAO as a Service solution that provides at its core: the choice of permissionless/permissioned membership, continuous fundraising/liquidity, automated reputation management, reputation weighted voting, and decentralized fund allocation with swappable voting mechanisms - enabling coordination for the masses.

## Contributing

### Install the dependencies

```bash
yarn
```

### Compile and migrate the contracts

> This requires [Ganache](https://www.trufflesuite.com/ganache) running in the background on port 7545 (default).

```bash
npx truffle migrate --reset
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```
