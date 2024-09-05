# Recipes

A C–ATTS recipe is a set of instructions that tells the C–ATTS engine how to create a composite attestation. It defines the "anatomy" of a composite attestation, instructing the engine how to query data from different sources, process the results, and generate the final attestation.

Recipes are created by C–ATTS users to be shared with the community. The C–ATTS interface does not currently support creating recipes, instead, users create and test recipes locally using the [C–ATTS CLI](/cli) and then submit them to the C–ATTS engine.

C–ATTS maintains an [repository of recipes](https://github.com/c-atts/catts-recipes) that can be used as a starting point for creating your own recipes. The repository is available on GitHub and is open to contributions from the community.

## Recipe example

```json
{
  "name": "gtc-passport-clone",
  "description": "Make a copy of your Gitcoin Passport score to another chain.",
  "keywords": ["gitcoin", "passport"],
  "queries": [
    {
      "url": "https://optimism.easscan.org/graphql",
      "body": {
        "query": "query PassportQuery($where: AttestationWhereInput, $take: Int) { attestations(where: $where, take: $take) { decodedDataJson } }",
        "variables": {
          "where": {
            "schemaId": {
              "equals": "0x6ab5d34260fca0cfcf0e76e96d439cace6aa7c3c019d7c4580ed52c6845e9c89"
            },
            "recipient": {
              "equals": "{user_eth_address}",
              "mode": "insensitive"
            }
          },
          "take": 1
        }
      }
    }
  ],
  "schema": "uint256 score,uint32 scorer_id,uint8 score_decimals",
  "resolver": "0x0000000000000000000000000000000000000000",
  "revokable": false
}
```

The above query makes a GraphQL query that fetches the Gitcoin Passport score of a user from the EAS API on Optimism. 

## Name, description, keywords

These fields help users understand what the recipe does. The engine indexes these fields to make it easier to search for recipes.

### `name` 
- Should be unique and descriptive and serves as the key for the recipe in the C–ATTS engine. 
- Must be lowercase, alphanumeric, may contain hyphens, must not start or end with a hyphen, and must not start with a digit.
- Length: 3-50 characters.

### `description`
- A brief description of what the recipe does.
- Length: 3-160 characters.

### `keywords`
- An array of keywords that describe the recipe.
- Each keyword must be lowercase, alphanumeric, and may contain hyphens.
- Length: 3-50 characters.

## Queries

A recipe can define one or more queries that fetch data from different sources. Queries are executed by the C–ATTS engine in the order they are defined in the recipe. The results of the queries are then processed and combined to create the final attestation. Queries are proxied by service running on Cloudflare Workers, to bridge from IPv6 that the IC canisters use to the IPv4 that most APIs use.

### Query responses

Processing data in a smart contract is expensive, so it's important to only include the data that is needed for the attestation. IC also has a limit on the size of the data that can be passed to a canister.

The current limit on how much data a C–ATTS recipe can return is 4KB. If the data returned by the queries exceeds this limit, the recipe will fail to execute. Use the filter feature to minimize the amount of data returned by the queries.

### Dynamic variables

Dynamic variables are placeholders in the query body that are replaced with actual values at runtime. C–ATTS supports the following dynamic variables:

- `{user_eth_address}`: The Ethereum address of the user requesting the attestation.
- `{user_eth_address_lowercase}`: The lowercase version of the Ethereum address of the user requesting the attestation.

The following fields support dynamic variables:

- `url`
- `filter`
- `headers`
- `body.variables`

### `url`
- The URL of the GraphQL or REST API endpoint to query.
- Length: 1-255 characters.
- The following headers are added to the request:
  - `Content-Type: application/json`
  - `Accept: application/json`
  - `User-Agent: c-atts/0.0.1`
- API keys:
  - C–ATTS maintains API keys for the following services:
    - The Graph API
    - The Moralis API
  - When querying The Graph API, an occurance of `{api-key}` in the url is replaced with the API key.
  - When querying the Moralis API, the following header is added:
    - `X-API-Key: <Moralis API key>`
- Supports dynamic variables.

### `headers`
- Optional. An object containing additional headers to include in the query request.
- Format: `{ "header-name": "header-value" }`
- Supports dynamic variables.

### `body`
- Optional. An object containing the query body. If present, the query is assumed to be a GraphQL query and will be sent as a POST request. If absent, the query is assumed to be a REST query and will be sent as a GET request.

### `body.query`
- The GraphQL query to send to the API endpoint.
- Length: 1-1024 characters.

### `body.variables`
- The variables to include in the GraphQL query.
- Supports dynamic variables.

### `filter`
- Optional. A [JSONPath](https://github.com/dchester/jsonpath) filter to apply to the response data. Use a filter to minimize the amount of data returned by the query.
- Example recipe: [holds_cryptopunk](https://github.com/c-atts/catts-recipes/blob/main/recipes/holds_cryptopunk_block_20550351/recipe.json)

## Schema

The schema field defines the structure of the attestation that the recipe will generate. It is a comma-separated list of Solidity ABI fields, where each field is defined by a type and a name. 

The output of the recipe processing logic should match the schema defined in the recipe. If the output does not match the schema, the recipe will fail to execute.

Learn more about EAS schemas in the [EAS documentation](https://docs.attest.org/docs/core--concepts/schemas).

## Resolver

The resolver field specifies the Ethereum address of a smart contract that can resolve the attestation. The resolver contract is responsible for verifying the correctness of the attestation and can approve or reject it based on the data provided. If you do not have a resolver contract, you can use the zero address `0x0000000000000000000000000000000000000000`.

> [!IMPORTANT]
> If you specify a resolver contract, that contract needs to allow for the C–ATTS engine to create attestations. The address of the C–ATTS engine is `0x838a9bEBa747EB7FA26406707D707Eff01337848`.

## Revokable

The revokable field specifies whether the attestations created by the recipe can be revoked. Currently, revokable attestations are not supported, so this field should always be set to `false`.