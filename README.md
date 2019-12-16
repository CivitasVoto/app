# Civitas

## Overview

Civitas is a platform for creating communities to get work done! Anyone in the world can launch a community and its respective [Smart Token](https://support.bancor.network/hc/en-us/articles/360000472072-How-does-a-Smart-Token-work-) which - by utilizing Civitas Network’s [Liquid Token](https://support.bancor.network/hc/en-us/articles/360000457992-What-is-a-Liquid-Token-) - is tradeable with any other community token or Ethereum token in the Bancor Network. A beneficial side effect of this is that the market price for a community token is [automatically valuated](https://support.bancor.network/hc/en-us/articles/360000503372-How-does-automatic-pricing-and-market-making-work-) based on the overall value of the network, encouraging cooperation between communities. Once a community is established, community members vote to distribute commons funds generated from [membership dues](https://1337alliance.com/) to projects using [meritocratic governance](https://blog.colony.io/the-colony-reputation-system-5616293c3949/).

## Goals

I. Allow anyone in the world to create a community of value

II. Allow anyone in the world to complete work for a community

III. Allow anyone in the world to participate in a community’s economy by purchasing or earning a community’s token

IV. Allow anyone in the world to participate in a community’s governance by earning reputation (which represents their voting weight) from completing work

## Specifications

By standing on the shoulders of giants in open source we get a lot out of the box. Many primitives of Civitas already exist in standalone components that, when combined, realize the platform. These components include:

### [Bancor](https://about.bancor.network/protocol/)

The economy of the network - determines community token prices and allows for trading tokens within and outside of the Civitas Network.

### [Colony](https://colony.io/)

The labor force of the network - community project owners create bounties to be paid in a community’s token, held in escrow until the task is completed. Bounty hunters earn reputation respective to the amount earned.

### [Aragon](https://aragon.org/)

The foundation of the network - reputation holders create and vote on proposals to: allocate funds to projects, change membership dues, signal community decisions, revoke membership, ad infinitum. This can be extended for virtually any use case.

## Release Milestones

I. Network of Communities

- Launch communities with a bonding curve fundraising token

- Swap community tokens with any token in/outside the network

II. Community Projects and Tasks

- Members spearhead grants for projects to be funded from the community fund

- Once funded, project owners create and payout tasks with the funding

III. Community Governance

- Earn reputation from completing tasks effectively

- Create proposals for project funding, staking some reputation

- Vote on proposals using [Holographic Consensus](https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c)

## Post Release Milestones

IV. Community KPIs

- Utilize TheGraph for heuristic data analysis to evaluate a community’s activity and health

V. Legal Communities

- Integrate OpenLaw legal contracts to incorporate a community as an LLC

VI. Much, much more…

- Aragon Chain communities, compound.finance pools, and more to be announced!

## Demand and Competitive Advantage

The need for community governed funds distribution to sustain work efforts is a [hot topic in the Ethereum community](https://medium.com/streamrblog/a-proposal-for-ethereum-voting-mechanisms-and-common-funds-distribution-f637eb2515b1) and obviously extends far beyond the blockchain realm. One highly anticipated experiment includes [The LOA](https://medium.com/coinmonks/venturing-into-the-lao-comparing-molochdao-and-vmlao-solidity-designs-81da2361dba5) (built on [Moloch](https://medium.com/@simondlr/the-moloch-dao-collapsing-the-firm-2a800b3aa2e7)) which is a fundamental example but is limited by the simplicity of Moloch. Civitas leverages audited, modular frameworks such as [Bancor](https://about.bancor.network/protocol/), [Colony](https://colony.io/), and [Aragon](https://aragon.org/) to compose a more complete DAO as a Service solution that provides: continuous fundraising, reputation mechanisms with extendable governance, decentralized fund allocation - culminating in an embracement of gamification to boost cooperative growth.

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
