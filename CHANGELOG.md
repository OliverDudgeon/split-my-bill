# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.2.11](https://github.com/OliverDudgeon/split-my-bill/compare/0.2.10...0.2.11) (2023-05-29)

### [0.2.10](https://github.com/OliverDudgeon/split-my-bill/compare/0.2.9...0.2.10) (2023-05-29)

### [0.2.9](https://github.com/OliverDudgeon/split-my-bill/compare/0.2.8...0.2.9) (2023-05-29)

### [0.2.8](https://github.com/OliverDudgeon/split-my-bill/compare/0.2.7...0.2.8) (2023-05-29)

### [0.2.7](https://github.com/OliverDudgeon/split-my-bill/compare/0.2.6...0.2.7) (2023-05-29)


### Features

* **discounts:** display original price as hover text ([8821ddd](https://github.com/OliverDudgeon/split-my-bill/commit/8821ddd61e261d2b98fb9b53e1b01672b22652ab)), closes [#1](https://github.com/OliverDudgeon/split-my-bill/issues/1)
* **money:** when the receipt can't be perfectly split, display the remaining amount ([a68ca28](https://github.com/OliverDudgeon/split-my-bill/commit/a68ca28ef943809a0e824a34690c7d90f4043792)), closes [#1](https://github.com/OliverDudgeon/split-my-bill/issues/1)


### Bug Fixes

* **receipt:** imrpove parsing to better handle a few things ([f735d41](https://github.com/OliverDudgeon/split-my-bill/commit/f735d41bff0e9f00175fee6b3c9fa4cdfc9046db))

### [0.2.6](https://github.com/OliverDudgeon/split-my-bill/compare/0.2.5...0.2.6) (2022-11-08)


### Bug Fixes

* **deps:** fix package.json ([d1044c3](https://github.com/OliverDudgeon/split-my-bill/commit/d1044c37abbda0eef2917e3927c1103ad9230b89))

### [0.2.5](https://github.com/OliverDudgeon/split-my-bill/compare/0.2.4...0.2.5) (2022-11-08)


### Bug Fixes

* **share-button:** fix share button ([a172db8](https://github.com/OliverDudgeon/split-my-bill/commit/a172db83300522f432309a908f5f770047d115e2))
* **totals:** fix display of initials in totals when initials are given with whitespace ([c305041](https://github.com/OliverDudgeon/split-my-bill/commit/c30504113bf90818b1aa64d650340da85fc8518e))

### [0.2.4](https://github.com/OliverDudgeon/split-my-bill/compare/0.2.3...0.2.4) (2022-04-18)

### [0.2.3](https://github.com/OliverDudgeon/split-my-bill/compare/0.2.2...0.2.3) (2022-03-11)


### Bug Fixes

* **regexp:** Improve regexp by using [^£] groups ([fd34109](https://github.com/OliverDudgeon/split-my-bill/commit/fd341092e0a2cd9d1e1336638962cd6bf8e620d9))### [0.2.2](https://github.com/OliverDudgeon/split-my-bill/compare/0.2.1...0.2.2) (2022-02-01)

## [0.2.0](https://github.com/OliverDudgeon/split-my-bill/compare/0.1.1...0.2.0) (2021-11-01)

### Features

- **layout:** Improve layout and spacing of components ([447268d](https://github.com/OliverDudgeon/split-my-bill/commit/447268d90c08faaa7b14c690459cb027de2c8ac1))
- **reset-button:** Change reset behaviour to reset to empty receipt ([5a71b46](https://github.com/OliverDudgeon/split-my-bill/commit/5a71b463d5c873fa5d51c80aebf2d584ab861715))

### [0.1.1](https://github.com/OliverDudgeon/split-my-bill/compare/0.1.0...0.1.1) (2021-11-01)

### Bug Fixes

- **actions:** Add missing pnpm install ([d06a7dd](https://github.com/OliverDudgeon/split-my-bill/commit/d06a7dd3aa2fb718c59b303fc3c0abc18b57f8c4))
- **actions:** Another test-action fix ([ee4379a](https://github.com/OliverDudgeon/split-my-bill/commit/ee4379ad288744cd3a7d5f00f43af7f4fc6508bf))
- **actions:** Fix order of jobs ([8038a13](https://github.com/OliverDudgeon/split-my-bill/commit/8038a1303bf9470a4ba4b0120a9eca02ba8edde6))
- **actions:** One more test-action fix ([711ba1c](https://github.com/OliverDudgeon/split-my-bill/commit/711ba1c5a595b6f0ccce16491a626ae93770c908))
- **actions:** pnpm actions fixes ([1c26282](https://github.com/OliverDudgeon/split-my-bill/commit/1c2628285427958d5fecd5eec8875410705ce9ee))
- **actions:** Use Node 16 in test-action ([43d27e6](https://github.com/OliverDudgeon/split-my-bill/commit/43d27e677f067db3549f85ea96035320b718d1e6))

## [0.1.0](https://github.com/OliverDudgeon/split-my-bill/compare/1.0.0-beta.9...0.1.0) (2021-10-31)

### Features

- **reset-button:** Implement a reset button ([70360f7](https://github.com/OliverDudgeon/split-my-bill/commit/70360f72b123a8a7d3450460b6049d6267617ee3))

### Bug Fixes

- Disable npm publish ([6fdbbfa](https://github.com/OliverDudgeon/split-my-bill/commit/6fdbbfaa1fee2e425e82c94fa475e7ec1ce5c1a1))
- **receipt:** Add some symbols to the regex ([b2e9371](https://github.com/OliverDudgeon/split-my-bill/commit/b2e93712810b199d018ba7ff75bf1529e935c7b0))

## [1.0.0-beta.9](https://github.com/OliverDudgeon/split-my-bill/compare/1.0.0-beta.9...0.1.0) (2021-10-31)

### Features

- **receipt:** Improve receipt parsing ([0f2e7eb](https://github.com/OliverDudgeon/split-my-bill/commit/0f2e7ebcc079b1d82d4bfebb3c7f42e5dba27a9a))
- **service-worker:** Enable new service working build tool ([dc93f48](https://github.com/OliverDudgeon/split-my-bill/commit/dc93f4808700514d5a4c012678c7a70651c23e7f))

### Bug Fixes

- **keyboard-control:** Cleanup type of KyeboardEvent to not cause type issues ([1b79220](https://github.com/OliverDudgeon/split-my-bill/commit/1b79220160d51ec40d48d621f424104c2e73715a)), closes [#3](https://github.com/OliverDudgeon/split-my-bill/issues/3)
- **receipt:** Display table even if no text is entered. ([a4b98f0](https://github.com/OliverDudgeon/split-my-bill/commit/a4b98f00627d7ebaa7e08bf303072dcd64e56518))
- **url-state:** Fix error that appears when loading the site with no state ([7d31bd7](https://github.com/OliverDudgeon/split-my-bill/commit/7d31bd75500ee141be0fa5392ffe719898f5f0d6))

### Performance Improvements

- Replace lodash with just for throttle ([3978677](https://github.com/OliverDudgeon/split-my-bill/commit/3978677e93c31aebc02734f7505f1576a0a2f841))

## [1.0.0-beta.8](https://github.com/OliverDudgeon/split-my-bill/compare/1.0.0-beta.9...0.1.0) (2021-09-05)

### Features

- **discounts:** Support percentages in discounts ([43b9cdb](https://github.com/OliverDudgeon/split-my-bill/commit/43b9cdbc1389483b7e50b079d1fff1d750f26d75)), closes [#68](https://github.com/OliverDudgeon/split-my-bill/issues/68)
- **service-charge:** Add ability to split a service charge ([32fbc4b](https://github.com/OliverDudgeon/split-my-bill/commit/32fbc4b9182289a22defd3d691a2febca86ae446))

### Bug Fixes

- **number-of-people:** Improve size and style ([18c3f79](https://github.com/OliverDudgeon/split-my-bill/commit/18c3f7968afba19b41f423f6ad1cbb43f4cc711d))

## [1.0.0-beta.7](https://github.com/OliverDudgeon/split-my-bill/compare/1.0.0-beta.9...0.1.0) (2021-09-05)

### Bug Fixes

- **keyboard-control:** Fix keyboard popping up on mobile when changing number of people ([5b1dba7](https://github.com/OliverDudgeon/split-my-bill/commit/5b1dba796687cedf7e373cd690659176c483d40a))

## [1.0.0-beta.6](https://github.com/OliverDudgeon/split-my-bill/compare/1.0.0-beta.9...0.1.0) (2021-09-04)

### Features

- **number-of-people:** Replace input field with buttons ([ba98091](https://github.com/OliverDudgeon/split-my-bill/commit/ba980918a5de5b095571c4e87b0acc458c10119e))

### Bug Fixes

- fix typo ([fa61930](https://github.com/OliverDudgeon/split-my-bill/commit/fa619301c48abbb01020823d2ca0145bf26d3714))
- **keyboard-control:** Switch from a focus trap to focus dom node to fix bugs ([8b936da](https://github.com/OliverDudgeon/split-my-bill/commit/8b936daa27d73ec1368d21f26b9ca6ef9ec878aa))

## [1.0.0-beta.5](https://github.com/OliverDudgeon/split-my-bill/compare/1.0.0-beta.9...0.1.0) (2021-07-10)

### Features

- **items:** Add bold font to name when row is selected ([58e0833](https://github.com/OliverDudgeon/split-my-bill/commit/58e0833b6ba26ac31ac7e7c5a2b41b9457f42788))

## [1.0.0-beta.4](https://github.com/OliverDudgeon/split-my-bill/compare/1.0.0-beta.9...0.1.0) (2021-07-10)

### Features

- **keyboard-control:** Add implementation of keyboard control ([8e46515](https://github.com/OliverDudgeon/split-my-bill/commit/8e465155daad256707bff2c2a2fc9c858e0a4b7c))
- **receipt:** Add a calculated total of the receipt items ([afae0f6](https://github.com/OliverDudgeon/split-my-bill/commit/afae0f6d88b732953e21fec620f82dcc3c4bd30e))

## [1.0.0-beta.3](https://github.com/OliverDudgeon/split-my-bill/compare/1.0.0-beta.9...0.1.0) (2021-07-09)

### Bug Fixes

- **initials:** Fix initials not updating when the number of people change ([66975cf](https://github.com/OliverDudgeon/split-my-bill/commit/66975cf4218ef98210b274bb5c9035da96ccd6c7))

## [1.0.0-beta.2](https://github.com/OliverDudgeon/split-my-bill/compare/1.0.0-beta.9...0.1.0) (2021-07-04)

### Bug Fixes

- Attempt to fix tinyurl requests failing on github pages ([59fe858](https://github.com/OliverDudgeon/split-my-bill/commit/59fe858032e74f22cacbd6c9b535c65d48c7c310))

## [1.0.0-beta.1](https://github.com/OliverDudgeon/split-my-bill/compare/1.0.0-beta.9...0.1.0) (2021-07-04)

### Features

- **footer:** Add basic footer ([291cc34](https://github.com/OliverDudgeon/split-my-bill/commit/291cc34441cf33e214eea78ed14315c7defc02b2))
- **share-button:** Add button to share a shortenned url ([83bcc6e](https://github.com/OliverDudgeon/split-my-bill/commit/83bcc6eefa6f6bfa3b69283bba371d2eee31aeea))

### Bug Fixes

- **currency-format:** Fix position of pound symbol ([50f1159](https://github.com/OliverDudgeon/split-my-bill/commit/50f11597d7b6c84fa85b6375ede0fd5e1ed3d3cb))

### [0.0.1-alpha.14](https://github.com/OliverDudgeon/split-my-bill/compare/1.0.0-beta.9...0.1.0) (2021-07-04)

### Features

- **discounts:** Show effective price computed from with discount and update total ([23546c9](https://github.com/OliverDudgeon/split-my-bill/commit/23546c90930447329e9805a710401a8dcbfca40c))

### Bug Fixes

- Add missing key prop to initials ([2fbc160](https://github.com/OliverDudgeon/split-my-bill/commit/2fbc160e7975608194b65cfb40f0741431a35941))

### [0.0.1-alpha.13](https://github.com/OliverDudgeon/split-my-bill/compare/1.0.0-beta.9...0.1.0) (2021-07-04)

### Bug Fixes

- **initials:** Fix loading of initials when missing - as long as numberOfPeople is defined ([51d2c86](https://github.com/OliverDudgeon/split-my-bill/commit/51d2c86bef2fbb3efa4127ad630fc56752e4b0b4))

### [0.0.1-alpha.12](https://github.com/OliverDudgeon/split-my-bill/compare/1.0.0-beta.9...0.1.0) (2021-07-04)

### Features

- **initials:** Reintroduce intials ([8317adb](https://github.com/OliverDudgeon/split-my-bill/commit/8317adbac6b1b9e385863a2aa6e7ece06bda9041))
- **totals:** Add receipt total at the bottom of page ([4786327](https://github.com/OliverDudgeon/split-my-bill/commit/47863274f313119cef6fa74fe491a82d83934ea8))

### [0.0.1-alpha.11](https://github.com/OliverDudgeon/split-my-bill/compare/1.0.0-beta.9...0.1.0) (2021-07-04)

### Bug Fixes

- **url-state:** Fix github pages not loading properly due to use of subpaths ([5e18ac4](https://github.com/OliverDudgeon/split-my-bill/commit/5e18ac4f1e431837a7fc6576d4229f2cc767fe8e))

### [0.0.1-alpha.10](https://github.com/OliverDudgeon/split-my-bill/compare/1.0.0-beta.9...0.1.0) (2021-07-04)

### Features

- **url-state:** Allow the state to be stored as a base64 encoded path ([747b9a6](https://github.com/OliverDudgeon/split-my-bill/commit/747b9a6b22c50e058c6a5d763dfb83b48901fe8c))

### [0.0.1-alpha.9](https://github.com/OliverDudgeon/split-my-bill/compare/1.0.0-beta.9...0.1.0) (2021-06-29)

### Bug Fixes

- **vite:** Add missing trailing slash to base path ([4e5be2b](https://github.com/OliverDudgeon/split-my-bill/commit/4e5be2b9551aec46e85b53b8a11e72f59a2fc523))

### [0.0.1-alpha.8](https://github.com/OliverDudgeon/split-my-bill/compare/1.0.0-beta.9...0.1.0) (2021-06-29)

### Bug Fixes

- **actions:** Switch github pages action to use yarn ([83c996c](https://github.com/OliverDudgeon/split-my-bill/commit/83c996c29a1622a8756a03ae29f4929f6aa0850c))
- **vite:** Fix missing base path ([bedb93e](https://github.com/OliverDudgeon/split-my-bill/commit/bedb93e3a18e67d76ab0565e13a6d8ee624b2fc5))

### [0.0.1-alpha.7](https://github.com/OliverDudgeon/split-my-bill/compare/1.0.0-beta.9...0.1.0) (2021-06-29)

### Features

- **query-params:** Save and load form state in query parameters ([f8c18ed](https://github.com/OliverDudgeon/split-my-bill/commit/f8c18ed14ff69d64ef02994d05dcc3888595c81b))

### [0.0.1-alpha.6](https://github.com/OliverDudgeon/split-my-bill/compare/1.0.0-beta.9...0.1.0) (2021-06-05)

### Features

- **layout:** Improve display on mobile ([6c2894e](https://github.com/OliverDudgeon/split-my-bill/commit/6c2894eb8cc9cd3fdde0c7e82144d68209106113))
- **ui/inputs:** Use peroples' names as placeholder text to make filling out data easier ([0e09d74](https://github.com/OliverDudgeon/split-my-bill/commit/0e09d744c8e3ef2084119da52bc2de27c705db13))

### [0.0.1-alpha.5](https://github.com/OliverDudgeon/split-my-bill/compare/1.0.0-beta.9...0.1.0) (2021-06-05)

### Features

- **app:** Change default number of people to 3 ([8c2d51c](https://github.com/OliverDudgeon/split-my-bill/commit/8c2d51cfee6081ec75086bdb66f90a32f13d611d))

### Bug Fixes

- **layout:** Fix missing classes due to interpolation ([8dae78b](https://github.com/OliverDudgeon/split-my-bill/commit/8dae78b876b3385bece2437281c37c7dc87de633))

### [0.0.1-alpha.4](https://github.com/OliverDudgeon/split-my-bill/compare/1.0.0-beta.9...0.1.0) (2021-06-05)

### Bug Fixes

- **actions:** Attempt to fix actions running on tag ([45ff1e8](https://github.com/OliverDudgeon/split-my-bill/commit/45ff1e8d055f2ace55265a1ebef2a2902b0ddc8c))

### [0.0.1-alpha.3](https://github.com/OliverDudgeon/split-my-bill/compare/1.0.0-beta.9...0.1.0) (2021-06-05)

### Features

- **layout:** Make gird responsive so it is more usable on mobile ([0b5394f](https://github.com/OliverDudgeon/split-my-bill/commit/0b5394f0978e1864e6f5b8a6538b9a19b615f649))
- **tailwind:** Add autoprefixer to postcss config ([f549880](https://github.com/OliverDudgeon/split-my-bill/commit/f5498807a3ca1e267d0fa984bbc05f2b33f5ce60))
- **tailwind:** Add breakpoint indicator to the Ui when in development ([d1df807](https://github.com/OliverDudgeon/split-my-bill/commit/d1df80742a90a5fe0bf10eb083766766b3d46e73))
- **ui/inputs:** Add initial styles to input elements ([7d5efc6](https://github.com/OliverDudgeon/split-my-bill/commit/7d5efc64a8e49753092b81697f9246d5c8b168f0))

### Bug Fixes

- **snowpack:** Switch index.html to use PUBLIC_URL ([2b83f7b](https://github.com/OliverDudgeon/split-my-bill/commit/2b83f7b57a8c56b72489ef13dc93282418b1250a))

### [0.0.1-alpha.2](https://github.com/OliverDudgeon/split-my-bill/compare/1.0.0-beta.9...0.1.0) (2021-06-02)

### Bug Fixes

- **snowpack:** Fix index.html js source for deployment ([463d25a](https://github.com/OliverDudgeon/split-my-bill/commit/463d25a13695a7c108302c106a5575701afeabbd))

### [0.0.1-alpha.1](https://github.com/OliverDudgeon/split-my-bill/compare/1.0.0-beta.9...0.1.0) (2021-06-01)

### Features

- **layout:** Use css grid to layout the app ([d74ff81](https://github.com/OliverDudgeon/split-my-bill/commit/d74ff81646d122ec76783c94e3b5d90536570754))

### Bug Fixes

- **actions:** Try to fix path issues with the github-pages deployment ([ca7b13c](https://github.com/OliverDudgeon/split-my-bill/commit/ca7b13c826d775ed2e173b922f3d0c2f6c0a4ab0))