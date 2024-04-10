#  C–ATTS
## Composite Attestations
Composite attestations are a new type of attestation combining data from multiple sources to form a unified and verifiable credential.

> [!NOTE]
> C–ATTS is in active development. We expect to release a beta version by the end of Q2 2024. Read more about the project in this article: [Introducing: Composite Attestations Engine (C–ATTS)](https://kristoferlund.se/blog/240214-catts).

## Flow

![](/images/240214-catts-4.jpg)

The flow of creating composite attestations using CATTS is as follows:
1. **Create recipe**: Define a recipe that includes custom queries, processing logic and output schema.
2. **Simulate run**: Simulate the run to verify the correctness of the recipe. Queries are run in the browser at no cost. A run can be simulated many times during the recipe creation process.
3. **Run**: Running the recipe means that the CATTS engine executes all queries and process the result set according to the processing instructions. The run output is saved and a run receipt is created as an attestation.
4. **Create attestations**: The CATTS engine creates attestations based on the run output and the output schema.

## Recipe

The CATTS recipe is a set of instructions that CATTS uses to create attestations. The recipe is in itself an attestation, consisting of the following parts:

- [Queries](#queries)
- [Query variables](#query-variables)
- [Query settings](#query-settings)
- [Processor](#processor)
- [Output schema](#output-schema)


### Queries

- A query fetches data from the EAS GraphQL API. 
- Queries are executed in the canister as HTTPS outcalls.
- The result of a query is determined by the query itself and the query variables.

Example:

```graphql
query Query($where: AttestationWhereInput) {
  attestations(where: $where) {
    recipient
  }
}
```

The above query will return all the recipients of attestations that match the criteriea defined in the `where` variable.

### Query variables

- All variables that are allowed by the EAS GraphQL API schema are allowed in the recipe.
- Every query can have its own set of variables.
- Variables cannot be overridden on a per run basis. This might be a feature in future iterations.

Example:

```json
[
  "where": {
    "schemaId": {
      "equals": "0xCBA...321"
    },
  },
]
```

The above query and variable will return all the receipents of all attestations that have been created using the schema with UID `0xCBA...321`.

### Query settings

- Every query can have its own settings.
- In the first iteration, the settings available are limited. In future iterations, more advanced settings will be available.
- Settings:
  - `chain: number` - The chain to run the query on.

### Processor

- After running the queries, we want to process the result set to create aggregate attestations using arbitrary logic. 
- The logic expresses what we want to create attestations for.
- Processors are run in the canister. This is a key feature of CATTS. Running the processor in the canister ensures that the processor is run in a secure environment and that we can trust the result of the processor.
-  Processors are written in JavaScript.

Example, imagine a Javascript function that performs the following logic:

```
Process the data set and return only those recipients that have attestations for 
"is a human" and "has a gitcoin passport score of 30 or more".
```

### Output schema

- The output schema is a Attestation schema that is used to create attestations based on the result of the processor.
- Schemas are defined outside of EEA and are referenced by UID.
- Schema:
  - `UID: string` - UID referencing an EAS schema.
  - `chain: number` - The chain to create the attestations on.

## Composite Attestation

A composite attestation is an attestation that is created based on the result of the processor. The attestations are created by the CATTS canister. 

- Every attestation references the "run receipt" attestation in the "referenced attestation" field.
- The CATTS canister has to pay for the attestations it creates. This cost is passed on to the user that is making the run. The cost is determined by the number of attestations that are created and the chain that the attestations are created on.

## Receipt

A run receipt is created for every run, as a way to verify the correctness of the composite attestations. The receipt is created as an attestation on the same chain as the attestations that were created.

- All receipts use the same predefined schema.
- Schema:
  - `recipe_uid: string` - The UID of the recipe that was run.
  - `data_raw: any[]` - The raw data that was returned from the queries.
  - `data_processed: any[]` - The data that was returned from the processor.
  - `timestamp: number` - The timestamp of the run.
  - `initiator: string (ethereum address)` - The address that initiated the run.

## Example run: User has attestation 1 AND attestation 2

The below example shows how to create a composite attestation for a user that has both attestation 1 and attestation 2.

### Recipe

#### Query

Fetch all recipients of attestations, determined by the `where1` and `where2` variables.

```graphql
query Query1($where1: AttestationWhereInput) {
  attestations(where: $where1) {
    recipient
  }
}
query Query2($where2: AttestationWhereInput) {
  attestations(where: $where2) {
    recipient
  }
}
```


#### Query variables

The above query and variable will return all the receipents of all attestations that have been created using the schema with UID `0xCBA...321` and `0xABC...123`.

```json
{
  "where1": {
    "schemaId": {
      "equals": "0xCBA...321"
    },
  },
  "where2": {
	  "schemaId": {
      "equals": "0xABC...123"
    },
  },
}
```


#### Query settings

Note the `chain` setting. In the first query, we are running the query on chain 1, and in the second query, we are running the query on chain 10.

```json
{
  "Query1": {
    "chain": 1
  },
  "Query2": {
    "chain": 10
  }
}
```


#### Processor

Create a merged list with addresses that exist in query 1 and 2:

``` js
function process(data) {
  const recipientsQuery1 = data.Query1.map(item => item.recipient);
  const recipientsQuery2 = data.Query2.map(item => item.recipient);
  return recipientsQuery1.filter(recipient => recipientsQuery2.includes(recipient));
}
```

#### Output schema

Define the composite attestation schema as follows:

```json
{
  "UID": "0x123...456",
  "schema": [
    {
      "name": "hasAttestation1and2",
      "type": "boolean"
    }
  ]
}
```

A user that has both attestation 1 and 2 will receive an attestation with the schema `0x123...456` and the data `{"hasAttestation1and2": true}`.

### Run

#### 1. Run queries

Running the two queries return the following result set:
```json
{
  "Query1": [
    { "recipient": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" },
    { "recipient": "0x1E0447b19BB6EcFdAe1e4AE1694b0C3659614e4e" },
    { "recipient": "0x7ED57EdC930333F9130B247797C718234272755F" }
  ],
  "Query2": [
    { "recipient": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" },
    { "recipient": "0xbd0531975D4D273e557E40856320304B39806AD8" },
    { "recipient": "0x7ED57EdC930333F9130B247797C718234272755F" }
  ]
}
```

#### 2. Run processor

After processing the data, only two addresses remain:
```json
[
  { "recipient": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" },
  { "recipient": "0x7ED57EdC930333F9130B247797C718234272755F" }
]
```

#### 3. Create attestations

Create attestations for all addresses in the processor result:

```json
{
  "attestations": [
    {
      "recipient": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      "schema": "0x123...456",
      "data": {
        "hasAttestation1and2": true
      }
    },
    {
      "recipient": "0x7ED57EdC930333F9130B247797C718234272755F",
      "schema": "0x123...456",
      "data": {
        "hasAttestation1and2": true
      }
    }
  ]
}
```

#### 4. Create run receipt

The run receipt reflects all details of the run and is created as an attestation.

```json
{
  "run": {
    "recipe_uid": "0xabC...867",
    "data_raw": {
      "Query1": [
        { "recipient": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" },
        { "recipient": "0x1E0447b19BB6EcFdAe1e4AE1694b0C3659614e4e" },
        { "recipient": "0x7ED57EdC930333F9130B247797C718234272755F" }
      ],
      "Query2": [
        { "recipient": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" },
        { "recipient": "0xbd0531975D4D273e557E40856320304B39806AD8" },
        { "recipient": "0x7ED57EdC930333F9130B247797C718234272755F" }
      ]
    },
    "data_processed": [
      { "recipient": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" },
      { "recipient": "0x7ED57EdC930333F9130B247797C718234272755F" }
    ],
    "timestamp": 1634025600,
    "initiator": "0xAAA...111"
  }
}
