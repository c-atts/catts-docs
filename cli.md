## Command Line Interface

The C–ATTS CLI is the easiest way to develop, test, and run C–ATTS recipes locally. The CLI fetches query results, runs processor scripts, and validates schema items against the recipe's schema.

As a starting point for your recipe development, please fork the [catts-recipes](https://github.com/c-atts/catts-recipes) repository.

## Installation

Install the package globally to be able to use the `catts` command-line tool.

```bash
npm install -g catts-cli
```

## CLI Usage

### Querying

To fetch query results from a recipe, use the `query` command:

```bash
catts query <recipeFolder>
```

The `query` command will fetch the query results from the specified recipe and print them to the console. You can optionally specify the index of the query to run:

```bash
catts query <recipeFolder> -i <index>
```

To get more detailed output, including verbose logging, use the -v or --verbose option:

```bash
catts query <recipeFolder> -v
```

### Running

To run a recipe, use the `run` command:

```bash
catts run <recipeFolder>
```

The `run` command will fetch the query results from the specified recipe, run the processor script, validate the schema items against the recipe's schema, and print the results to the console.

To get more detailed output, including verbose logging, use the `-v` or `--verbose` option:

```bash
catts run <recipeFolder> -v
```

### Customizing the user address

The CLI needs to know a user address to fetch query results. By default, the SDK uses the `USER_ETH_ADDRESS` environment variable to fetch query results. If you want to use a different address, you can pass the `-e` or `--eth-address` option to the `query` or `run` commands. Alternatively, you can create a `.env` file in the root of your project with the `USER_ETH_ADDRESS` variable set to the desired address.

```bash
catts query <recipeFolder> -e <address>
catts run <recipeFolder> -e <address>
```