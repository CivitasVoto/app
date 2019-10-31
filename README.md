# Civitas

## Overview

Civitas is a platform for creating communities to get work done! Anyone in the world can launch a community and its respective [Smart Token](https://support.bancor.network/hc/en-us/articles/360000472072-How-does-a-Smart-Token-work-) which - by utilizing the Civitas Network’s [Relay Token](https://support.bancor.network/hc/en-us/articles/360000458052-What-is-a-Relay-Token-) - is tradeable with any other community token or Ethereum token in the Bancor Network. A beneficial side effect of this is that the market price for a community token is [automatically valuated](https://support.bancor.network/hc/en-us/articles/360000457992-What-is-a-Liquid-Token-) based on the overall value of the network, incentivizing cooperativity between communities. Once a community is established, community members vote to distribute operational funds from [membership dues](https://1337alliance.com/) to projects using [meritocratic governance](https://medium.com/daostack/a-guide-to-daostacks-initial-reputation-protocol-f8365f157f7a).

## Goals

I. Allow anyone in the world to create a community of value

II. Allow anyone in the world to complete work for a community

III. Allow anyone in the world to participate in a community’s economy by purchasing or earning a community’s token

IV. Allow anyone in the world to participate in a community’s governance by earning reputation (which represents their voting weight) while completing work

## Specifications

By standing on the shoulders of giants in open source we get a lot out of the box. Many primitives of Civitas already exist in standalone components that, when combined, realize the platform. These components include:

### Bancor

The economy of the network - determines community token prices and allows for trading tokens within and outside of the Civitas Network.

### Bounties Network

The labor force of the network - community project owners create bounties to be paid in a community’s token, held in escrow until the task is completed.

### DAOstack

The constitution of the network - provides the ability to create and vote on proposals to: upgrade the network or a community, fund projects, whitelist members, and much more...

## Release Milestones

I. Network of Communities

- Launch communities with a token

- Swap community tokens with any token in/outside the network

II. Community Projects and Tasks

- Members request grants for projects to be funded from the community fund

- Project owner creates, assigns, and arbitrates payout for tasks in a project

III. Community Governance

- Earn reputation (voting weight) from completing tasks effectively

- Stake reputation towards funding proposals to be voted upon

## Post Release Milestones

IV. Community KPIs

- Utilize TheGraph for heuristic data analysis to evaluate a community’s activity and health

V. Legal Communities

- Integrate OpenLaw legal contracts to incorporate a community as an LLC

VI. Much, much more…

- To be announced!

## Demand and Competitive Advantage

The need for community governed funds distribution to sustain work efforts is a [primary concern of Ethereum](https://medium.com/streamrblog/a-proposal-for-ethereum-voting-mechanisms-and-common-funds-distribution-f637eb2515b1) and obviously extends far beyond the blockchain realm. One highly anticipated experiment includes [The LOA](https://medium.com/coinmonks/venturing-into-the-lao-comparing-molochdao-and-vmlao-solidity-designs-81da2361dba5) (built on [Moloch](https://medium.com/@simondlr/the-moloch-dao-collapsing-the-firm-2a800b3aa2e7)) which is a fundamental example but is limited by the primitive simplicity of Moloch. Civitas leverages sophisticated, audited, modular smart contracts such as [Bancor Network](https://support.bancor.network/hc/en-us/articles/360001190311-How-is-Bancor-different-than-an-exchange-), [Bounties Network](https://bounties.network/gettingStarted), and [DAOstack](https://medium.com/daostack/an-explanation-of-daostack-in-fairly-simple-terms-d0e034739c5a) to compose a more complete DAO as a Service (DaaS) solution.

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
