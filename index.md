# Attest to Any Onchain Data

**If you can query the data, you can attest to it!**

![](/images/index-1.svg)

C–ATTS lets you to attest to a wide range of onchain data, making it easy to create secure and verifiable credentials. Whether it’s **identity**, **reputation**, or **transaction data**, you can generate attestations on multiple EVM L1s and L2s.

## Attestations

An attestations is a statement that is made about a subject. It can be about anything, from a person's identity to a transaction's details. Attestations are made by an attester, who is the person or entity that makes the statement. 

Example attestations:
- I attest to having met Alice.
- Project X attests to Alice being a member of their community.
- Alice attests to having received a payment from Bob.

## EAS

The [Ethereum Attestation Service](https://attest.sh) (EAS) is an infrastructure public good for making attestations onchain or offchain about anything. Attestations can represent identity, reputation, knowledge, and much more. EAS is a tokenless and free service that is available on mainnet, several L2s, and various testnets. 

> EAS is a standard and base layer where any entity can make attestations about anything. This primitive and ledger of attestations will help us decentralize more than just money and assets. We'll be able to coordinate and build reputation systems, voting systems, governance systems, decentralized social media, provenance of goods, knowledge and social graphs, and much much more.

## Composite Attestations

C–ATTS is a service that allows you to create **composite attestations** based on custom queries and processing logic. 

**To put it simply, C–ATTS lets you query multiple on-chain data points, transform or combine the results as needed, and generate an attestation based on the final output.**

![](/images/index-2.svg)

The image above exemplifies a typical use case for C–ATTS. In this scenario, a community wants to create an attestation that says "This user is eligible for membership". Data is fetched from three different sources on different chains, processed, and combined to create the final attestation. The processing logic guarantees that the user is eligible for membership only if they meet all the criteria.

## The C–ATTS engine

> An attestation is not worth anything if you cannot trust the party that created it.

The C–ATTS engine is a smart contract canister that runs on the [Internet Computer](https://internetcomputer.org/) (ICP), ensuring that the creation and verification of attestations are both reliable and transparent. 

Thanks to the cross-chain capabilities of the ICP, the C–ATTS engine can both act as an "Oracle" fetching data from onchain and offchain sources, and as a "Verifier" that can attest to the correctness of the composite attestations it creates. ICP canisters can sign Ethereum transactions thanks to advanced chain key cryptography, making it possible to create attestations on multiple EVM chains without compromising security.

Currently, C–ATTS supports creating attestations on Optimism, Arbitrum, Base and Ethereum Sepolia.

## Query support

The C–ATTS engine can query any data source providing open GraphQL or REST API enpoints! This includes, but is not limited to:

### The EAS API

The [EAS API](https://docs.attest.org/docs/developer-tools/api) is a public API that allows you to query the Ethereum Attestation Service. You can use it to fetch attestations, attesters, subjects, and more. The EAS API is a free and open service that is available on mainnet, several L2s, and various testnets.

### The Graph API

[The Graph](https://thegraph.com/explorer) is a decentralized protocol for indexing and querying data from blockchains. You can use it to query data from Ethereum, Arbitrum, Optimism, and more.

### The Moralis API

[Moralis](https://moralis.io/api/) is a blockchain infrastructure provider that offers a wide range of services, including a powerful API that allows you to query data from multiple blockchains. Their APIs cover a wide range of use cases, from fetching transaction data to querying NFT metadata.

