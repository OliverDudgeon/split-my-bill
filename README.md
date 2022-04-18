# Split my Bill

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

The app is build with [Vite](vitejs.dev/) using ReactJS. All components are written in TypeScript.
Form data is handled with [Formik](https://formik.org/). And Gzip compression with [Pako](https://github.com/nodeca/pako). On tag the app is deployed to GitHub pages. TinyURL's API is used for URL shortening.

## Release

Use [standard-version](https://github.com/conventional-changelog/standard-version) to:

- Update the changelog from conventional commit messages
- Work out the next semver version
- Update the package.json version
- Commit these changes and create a tag

```sh
pnpm dlx standard-version -t "''"
git push --follow-tags origin master
```
