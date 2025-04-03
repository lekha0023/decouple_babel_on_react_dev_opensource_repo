# react.dev

This repo contains the source code and documentation powering [react.dev](https://react.dev/).

## Getting started

### Prerequisites

1. Git
1. Node: any version starting with v16.8.0 or greater
1. Yarn: See [Yarn website for installation instructions](https://yarnpkg.com/lang/en/docs/install/)
1. A fork of the repo (for any contributions)
1. A clone of the [react.dev repo](https://github.com/reactjs/react.dev) on your local machine

### Installation

1. `cd react.dev` to go into the project root
3. `yarn` to install the website's npm dependencies

### Running locally

1. `yarn dev` to start the development server (powered by [Next.js](https://nextjs.org/))
1. `open http://localhost:3000` to open the site in your favorite browser

## Contributing

### Guidelines

The documentation is divided into several sections with a different tone and purpose. If you plan to write more than a few sentences, you might find it helpful to get familiar with the [contributing guidelines](https://github.com/reactjs/react.dev/blob/main/CONTRIBUTING.md#guidelines-for-text) for the appropriate sections.

### Create a branch

1. `git checkout main` from any folder in your local `react.dev` repository
1. `git pull origin main` to ensure you have the latest main code
1. `git checkout -b the-name-of-my-branch` (replacing `the-name-of-my-branch` with a suitable name) to create a branch

### Make the change

1. Follow the ["Running locally"](#running-locally) instructions
1. Save the files and check in the browser
  1. Changes to React components in `src` will hot-reload
  1. Changes to markdown files in `content` will hot-reload
  1. If working with plugins, you may need to remove the `.cache` directory and restart the server

### Test the change

1. If possible, test any visual changes in all latest versions of common browsers, on both desktop and mobile.
2. Run `yarn check-all`. (This will run Prettier, ESLint and validate types.)

### Push it

1. `git add -A && git commit -m "My message"` (replacing `My message` with a commit message, such as `Fix header logo on Android`) to stage and commit your changes
1. `git push my-fork-name the-name-of-my-branch`
1. Go to the [react.dev repo](https://github.com/reactjs/react.dev) and you should see recently pushed branches.
1. Follow GitHub's instructions.
1. If possible, include screenshots of visual changes. A preview build is triggered after your changes are pushed to GitHub.

## Translation

If you are interested in translating `react.dev`, please see the current translation efforts [here](https://github.com/reactjs/react.dev/issues/4135).

## License
Content submitted to [react.dev](https://react.dev/) is CC-BY-4.0 licensed, as found in the [LICENSE-DOCS.md](https://github.com/reactjs/react.dev/blob/main/LICENSE-DOCS.md) file.



// The section below highlights the experiment done in this repo decoupling babel from the existing react,dev opnesource project at
https://github.com/reactjs/react.dev 
step by step approach taken to perform decoupling
command to run app on local 
<img width="609" alt="screenshot 1" src="https://github.com/user-attachments/assets/ebe5a2ea-1d0a-4e74-bdb2-1053209bca5f" />
<img width="609" alt="screenshot 1" src="https://github.com/user-attachments/assets/41e77b3e-c3a6-4f46-bd84-41790ddb7072" />

1) create a .babelrc file as this is a single page app and not mono repo. enabling nextjs to pick babel changes from this file
   issue 1:
   `ReferenceError: React is not defined`
   
- Cause: Missing JSX transformation. 
- Fix:Ensure Babel uses modern JSX transform.
- added below presents in babelrc to fix it
  ```json
  {
    "presets": [
      ["@babel/preset-react", { "runtime": "automatic" }]
    ]
  }

issue 2:
 MDX Compilation Errors (`Reading compiled MDX` failed)
- Cause: Missing explicit React import in MDX components.
- Fix: Add `import React from 'react'` where required.

issue 3:
Babel Plugin Issues (`SyntaxError: Unexpected token '<'`)
- Cause: Next.js does not always use Babel for transformations unless explicitly configured.
- Fix: Explicitly define Babel plugins in `.babelrc`.

2) Babel Configuration Created Step by Step

```json
{
  "presets": [
    "next/babel",
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        "runtime": "automatic"
      }
    ],
    "@babel/preset-typescript"
  ],
  "plugins": [
    "babel-plugin-transform-import-meta",
    [
      "@babel/plugin-transform-modules-commonjs",
      {
        "allowTopLevelThis": true
      }
    ],
    [
      "module-resolver",
      {
        "root": ["./"],
        "alias": {
          "remark-html": "./node_modules/remark-html",
          "remark-smartypants": "./plugins/remark-smartypants",
          "remark-header-custom-ids": "./plugins/remark-header-custom-ids"
        }
      }
    ],
    [
      "@babel/plugin-transform-react-jsx",
      {
        "runtime": "automatic"
      }
    ]
  ]
}
```
further reading :
Babel Presets: These are predefined configuration that bundle multiple plugins to transform specific type of Javascript

List of presets used in this babel file:
next/babel: 
- Preset from Next.js that automatically configures Babel for Next.js applications.
- Including the support for React, modern JavaScript features, and TypeScript.
@babel/preset-env:
- To ensure compatibility with different JavaScript environments (browsers, Node.js, etc.). this preset is used
- It compiles modern JavaScript syntax down to older versions that browsers can understand.

@babel/preset-react:
- Preset to enableJSX transformation into standard JavaScript functions.
- `{ "runtime": "automatic" }` eliminates the need for importing React in every component.

@babel/preset-typescript:
-To handle TypeScript files (`.ts` and `.tsx`) without requiring TypeScript compilation.

Babel Plugins: these are smaller and individual transformations used to modify specific JavaScript snippets (code) enabling fine grain control than presets

babel-plugin-transform-import-meta:
- Allows Babel to handle `import.meta`, which is commonly used in ES modules to reference the current module's metadata.

@babel/plugin-transform-modules-commonjs:
- Transforms ES module syntax (`import/export`) into CommonJS syntax (`require/module.exports`).
- `{ "allowTopLevelThis": true }` ensures `this` at the top level behaves correctly when transformed.

module-resolver:
- Allows aliasing module paths to avoid complex relative imports (e.g., `../../../` chains).
- Aliases used in your config:
  - `remark-html` → `./node_modules/remark-html`
  - `remark-smartypants` → `./plugins/remark-smartypants`
  - `remark-header-custom-ids` → `./plugins/remark-header-custom-ids`

@babel/plugin-transform-react-jsx:
- Ensures JSX is properly transformed into JavaScript.
- `{ "runtime": "automatic" }` optimizes JSX handling, making React imports unnecessary in components.

these are provided by nextjs or babel




