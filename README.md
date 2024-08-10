# Color Contrast Finder

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

The **Color Contrast Finder** is a library that automatically selects text colors that contrast with a given color. The library supports a variety of color formats (HEX, RGB, RGBA) and allows for user-defined thresholds and default color settings.

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
$ npm i color-contrast-finder

# with Yarn
$ yarn add color-contrast-finder

# with pnpm
$ pnpm add color-contrast-finder
```

<br>

## Usage

```javascript
// module
import { findContrastColor } from 'color-contrast-finder';

/**
 * `options.color` types:
 *   - `#f00`    // rgba(255, 0, 0, 1)  (Short hex code with no alpha channel)
 *   - `#f00f`   // rgba(255, 0, 0, 1)  (Short hex code with alpha channel)
 *   - `#ffffff` // rgba(255, 255, 255, 1)  (Full hex code with no alpha channel)
 *   - `#ffffffff` // rgba(255, 255, 255, 1)  (Full hex code with alpha channel)
 *   - `rgb(255, 255, 255)` // rgba(255, 255, 255, 1)  (RGB color with no alpha channel)
 *   - `rgba(255, 255, 255, 0.3)` // rgba(255, 255, 255, 0.3)  (RGBA color with alpha channel)
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
 * <script type="text/javascript" src="{path}/color-contrast-finder.umd.cjs"></script>
 */ 

 const contrastColor = window['color-contrast-finder'].findContrastColor(options);
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
- [x] NPM publish

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