## Description

A simple TODO app, in the form of a Vue SPA.

## Run the project
To start the app, run

```bash
yarn serve
```

To run unit tests, run

```bash
yarn test:unit
```

To run the e2e tests, run
```bash
yarn test:e2e
```
You can use the `--headless` parameter, to skip the UI

## Details

**Main Features:**

1. Creating new tasks
2. Editing tasks
3. Marking a task as complete
4. Marking a task as not complete
5. Deleting a task

**Extra features:**

The App also incorporates a few extra features, that were "nice to have":

1. List deleted tasks (trash bucket)
2. Un-delete items from trash
3. Delete items permanently from bucket
4. Re-order tasks
5. Edit tasks
6. Persist tasks between refreshes via Local Storage

## Tech behind

**Styling:**
* SCSS
* Bulma - minimal CSS Framework, stripped down to only the components I use. Mostly for buttons and inputs

**Bundler:** 
* Vue CLI 4

**Quality:** 
* ESLint Standard preset + Vue-ESLint Recommended.

**Testing:**
* Unit: Jest + Vue Test Utils
* E2E: Cypress
