# Split my Bill

[![CodeQL](https://github.com/OliverDudgeon/split-my-bill/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/OliverDudgeon/split-my-bill/actions/workflows/codeql-analysis.yml) [![license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/OliverDudgeon/split-my-bill/blob/main/LICENSE)

<br />
<div align="center">
<b>Go to the app: <a href="https://oliverdudgeon.github.io/split-my-bill">Split My Bill</b></a>
</div>
<br />

Groups like to share, be that a meal or a grocery shop, but working out who owes what can be tricky. [Split My Bill](https://oliverdudgeon.github.io/split-my-bill) is designed to solve this problem by allowing a receipt to be entered and the items divided by share. To ensure everyone in the group is satisfied, your receipt has a permanent link which you can share with your group so they can be confident you have split the bill fairly.

![Screenshot of the app](https://raw.githubusercontent.com/OliverDudgeon/split-my-bill/main/assets/SplitMyBillScreenshot.png)

## FAQ

- **Where is the data stored?** In the URL! There is no server or database handling your data. The app works entirely in your browser (except for URL shortening)

- **Why not use Splitwise?**
  This app was designed to work in conjunction with apps like [Splitwise](https://www.splitwise.com/) which not everyone uses. Also their implementation is behind their paid pro plan.

## Tech

The app is built with [Vite](https://vite.dev/) using React. All components are written in TypeScript.
Form data is handled with [Formik](https://formik.org/), and Gzip compression with [Pako](https://github.com/nodeca/pako). Releases are deployed to GitHub Pages.

## Release

[Release Please](https://github.com/googleapis/release-please) maintains a release pull request from conventional commits on `main`. The pull request contains the next version and changelog update.

Merge the release pull request when the release is ready. Release Please then creates an unprefixed version tag and a GitHub release, and the release workflow deploys that exact tag to GitHub Pages.

Use `fix:` for patch releases, `feat:` for minor releases, and a `BREAKING CHANGE:` footer for major releases.
