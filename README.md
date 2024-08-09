# Contrast Color Finder

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

The **Contrast Color Finder** is a library that automatically selects text colors that contrast with a given color. The library supports a variety of color formats (HEX, RGB, RGBA) and allows for user-defined thresholds and default color settings.

<br>

## Features

- Support for HEX, RGB, and RGBA color formats
- Color contrast calculation taking into account transparency (Alpha)
- Support for user-defined brightness thresholds
- Customizable for high and low brightness colors
- Easy to use and flexible settings

<br>

## Installation

```bash
# with npm
$ npm i contrast-color-finder

# with Yarn
$ yarn add contrast-color-finder

# with pnpm
$ pnpm add contrast-color-finder
```

<br>

## Usage

```javascript
// module
import { findContrastColor } from 'color-contrast-finder';

/**
 * options
 *   color: #ffffff
 *   color: rgba(255, 255, 255)
 *   color: rgba(255, 255, 255, 0.3)
 */
const options = {
  color: '#3498db', // input color (in HEX, RGB, RGBA format)
  threshold: 0.5, // brightness threshold (default: 0.5)
  highColor: 'black', // text color to use when high brightness  (default: #000000)
  lowColor: 'white' // text color to use when low brightness (default: #FFFFFF)
};

const contrastColor = findContrastColor(options);
console.log(contrastColor); // 'black' or 'white'
```

```javascript
// umd

/**
 * html code
 * <script type="text/javascript" src="{path}/contrast-color-finder.umd.cjs"></script>
 */ 

 const contrastColor = window['contrast-color-finder'].findContrastColor(options);
 console.log(contrastColor); // 'black' or 'white'
```

<br>

![alt text](https://github.com/user-attachments/assets/2752c37e-aea0-43b5-b8e8-ccfb9ad3f064)

<br>


## License

[MIT](LICENSE).

<br>

## TODO

- [x] Function findContrastColor
- [x] Library build
- [x] Changesets setup
- [x] CI (lint)
- [x] CD (npm publish)

- [ ] NPM publish
- [ ] NPM_TOKEN Expire (2040-12-31)

<br>

## How to use publish

```bash
# 1. pnpm changeset
$ pnpm cs

# 2. Input next version

# 3. New file created in the .changeset folder

# 4. Commit & push new files

# 5. Automatically generate, merge, and publish PRs with CD jobs running. 
```

<br>