# Contrast Color Finder

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

The **Contrast Color Finder** is a library that automatically selects text colors that contrast with a given color. The library supports a variety of color formats (HEX, RGB, RGBA) and allows for user-defined thresholds and default color settings.

## Features

- Support for HEX, RGB, and RGBA color formats
- Color contrast calculation taking into account transparency (Alpha)
- Support for user-defined brightness thresholds
- Customizable for high and low brightness colors
- Easy to use and flexible settings

## Installation

```bash
# with npm
$ npm i contrast-color-finder

# with Yarn
$ yarn add contrast-color-finder

# with pnpm
$ pnpm add contrast-color-finder
```

## Usage
```javascript
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



## License

[MIT](LICENSE).


## TODO

- [ ] changesets & 버전 관리
- [ ] CI (lint)
- [ ] CD (npm publish)
