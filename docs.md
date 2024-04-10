#  Composite Attestations
Composite attestations are a new type of attestation combining data from multiple sources to form a unified and verifiable credential.

> [!NOTE]
> C–ATTS is in active development. We expect to release a beta version by the end of Q2 2024. Read more about the project in this article: [Introducing: Composite Attestations Engine (C–ATTS)](https://kristoferlund.se/blog/240214-catts).

## Introduction

The [Ethereum Attestation Service](https://attest.sh) (EAS) is an infrastructure public good for making attestations onchain or offchain about anything. Attestations can represent identity, reputation, knowledge, and much more. EAS is a tokenless and free service that is available on mainnet, several L2s, and various testnets. EAS is a great service! It is tokenless and free for anyone to use. **This means it is being used. A lot!** 

There is a universe of attestation data out there. EAS provides an API that allows you to query that data which makes integration into websites and apps easy.

![](/images/240214-catts-2.jpg)

Let's say I, as an app, want to offer membership to users that meet certain criteria. I my backend, I can use the EAS API to query all attestations that are relevant to my use case. Then, I write some custom logic to process the data and let the outcome of that logic determine if a user is eligible for membership. Easy!

But, what if I need to show a proof of the outcome of my logic? What if I need to create an attestation that says "This user is eligible for membership"? I can of course easily create that attestation. But, without knowledge of the data I processed or about the processing logic I ran on the data, how can anyone verify that the attestation I created is correct?

Wouldn't it be great if there was a way to create attestations based on the result of custom queries and processing logic and have the result of that logic be independently verifiable? That's where **CATTS**, the **Composite Attestations Engine** comes in.

![](/images/240214-catts-3.jpg)

CATTS allows for the creation of **composite attestations** based on custom queries and processing logic. Running on the Internet Computer (ICP) as a smart contract canister, it leverages data from existing attestations via the EAS GraphQL API, ensuring that the creation and verification of attestations are both reliable and transparent. The processing logic is defined as a piece of arbitrary JavaScript code, which is executed securely within the canister environment. The engine also provides a receipt for each run, detailing the settings used, which aids in verifying the correctness of the composite attestations. 

![](/images/240214-catts-5.jpg)

## Planned features

- **Custom queries**: Fetch data from the EAS GraphQL API using custom queries.
- **Custom processing logic**: Define custom processing logic to create composite attestations based on the result of the queries.
- **Secure execution**: The processing logic is executed securely within the canister environment.
- **Receipts**: A receipt is created for each run, detailing the settings used, which aids in verifying the correctness of the composite attestations.
- **Chain agnostic**: Run queries on one chain or on multiple chains.
- **Verifiable**: The result of the processing logic is independently verifiable.
- **Open**: The engine is open source and free to use. Anyone can create and run recipes.
- **Cost effective**: Attestation runs can be simulated before they are run. This ensures that the cost of running the canister is minimized.

## Future features

- **Advanced settings**: 
  - Allow query chain settings to be overridden on a per run and per query basis.
- **Allow users to "claim" their composite attestations**:
  - Transfers cost of creating attestations to the user.
  - Allow the user to claim an attestation using multiple addresses.
- **Even more chain agnostic**:
  - Allow the creation of attestations on multiple chains.
  - Allow querying other attestation services, not just EAS.
- **ZK attestations**:
  - Allow the creation of zero knowledge attestations.
