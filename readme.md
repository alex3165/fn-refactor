## Instructions

- Install dependencies: `yarn`
- Run Regression tests: `yarn test`

The refactor of the function is split in 3 files:

- function.ts: contain main function and business logic that solve this problem only
- utils.ts: helper functions specific to business (could live in a private util package)
- interfaces.ts: interfaces related to the business (could live in a private ts-data package)
