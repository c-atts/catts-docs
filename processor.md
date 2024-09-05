# Processor

Being able to **arbitrary** processing logic in the smart contracts on the Internet Computer (ICP) is one of the main features of C–ATTS. ICP canisters can run WASM code, which means that the processing logic can be executed in a secure and verifiable way. The C–ATTS engine runs a JavaScript runtime compiled to WASM, which allows it to execute the processing logic defined in the `processor.js` file.

The processing logic of a recipe is defined in a separate file named `processor.js`. This file contains the JavaScript code that processes the data fetched by the queries. The output of the processing logic should match the schema defined in the recipe. If the output does not match the schema, the recipe will fail to execute.

The processor code is provided with two global variables that contain the results of the queries:
- `queryResult`: The JSON object containing the results of the queries.
- `queryResultRaw`: The raw JSON string containing the results of the queries.

## Example: Clone an attestation

```JavaScript
if (!queryResult[0].data.attestations[0]) {
  throw new Error("Couldn't find a Gitcoin Passport score for this address.");
}

const decodedDataJson = JSON.parse(
  queryResult[0].data.attestations[0].decodedDataJson
);

let data = [];
for (const item of decodedDataJson) {
  data.push({
    name: item.name,
    type: item.type,
    value: item.name === "score" ? item.value.value.hex : item.value.value,
  });
}

return JSON.stringify(data);
```

Full recipe: https://github.com/c-atts/catts-recipes/tree/main/recipes/gtc_passport_clone

Walkthrough:
- Check if the query result contains the data it expects. If the data is not found, it throws an error.
- Parse the decoded data JSON string to get the atestation data.
- Return the data in the format expected by the schema, an array of objects.

> [!TIP]
> Throw an error if the data is not found or if the processing logic fails. This error message will be displayed to the user.

### Output

```json
[
  {
    "name": "score",
    "type": "uint256",
    "value": "0x028b0559f472598000"
  },
  {
    "name": "scorer_id",
    "type": "uint32",
    "value": 335
  },
  {
    "name": "score_decimals",
    "type": "uint8",
    "value": 18
  }
]
```

## Example: Composite attestation

Consider this example that shows some more complex processing logic that combines data from multiple queries to create a composite attestation.

Building on the data from two queries on two separate chains, this code checks if the user is eligible for a Gitcoin Passport score of 30 and is a resident of an EU country.

Full recipe: https://github.com/c-atts/catts-recipes/tree/main/recipes/eu_gtc_passport_30

```JavaScript
const EU_COUNTRIES = [
  "AT",
  "BE",
  "BG",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FR",
  "GR",
  "HR",
  "HU",
  "IE",
  "IT",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK",
];

if (!queryResult[0].data.attestations[0]) {
  throw new Error("Couldn't find a Gitcoin Passport score for this address.");
}

if (!queryResult[1].data.attestations[0]) {
  throw new Error("Couldn't find country of residence for this address.");
}

const scoreHex = JSON.parse(
  queryResult[0].data.attestations[0].decodedDataJson
)[0].value.value.hex;
const score = BigInt(scoreHex);
const requiredScore = BigInt("30000000000000000000");
const country = JSON.parse(
  queryResult[1].data.attestations[0].decodedDataJson
)[0].value.value;
const eligible = EU_COUNTRIES.includes(country) && score >= requiredScore;

if (!eligible) throw new Error("Not eligible for eu_gtc_passport_30");

return JSON.stringify([
  { name: "eu_gtc_passport_30", type: "bool", value: true },
]);
```