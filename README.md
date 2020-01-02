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

The App also incorporates a few extra features, that were on the "nice to have" side:

1. List deleted tasks (trash bucket)
2. Un-delete items from trash
3. Delete items permanently from bucket
4. Dedicated page for deleted items via Vue Router
4. Re-order tasks via Drag n Drop
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

## TODO:

From the list of requirements, I still have to:

 - [ ] Add a few more tests. Mostly integration, on TodoItem and RecycledTodoItem.
 - [ ] Improve JSDoc types.

As the task is to create a relatively simple ToDo app, there are a few things I would improve/add on top: 

 - [ ] Add LocalStorage fallback for browsers that have it blocked (Safari sometimes does this).
 - [ ] Allow selecting multiple items at once
 - [ ] Add cross tab support
 - [ ] Improve design - its not the prettiest thing
 - [ ] Improve accessibility - have not focused on it at all
 - [ ] Add keyboard only navigation support
 - [ ] Categorizing and Filtering (Category, Date, Status, Content search)
 - [ ] Allow completing all visible items and vice versa. (would go well with above)
 - [ ] Integrate with an API for extended features. 
 - [ ] Could allow anonymous usage via LocalStorage and API integration for logged-in users.
 - [ ] Add offline support (PWA).
