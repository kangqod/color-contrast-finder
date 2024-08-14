# Color Contrast Finder

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

The **Color Contrast Finder** is a JavaScript library designed to automatically select text colors that provide sufficient contrast with a given background color. The library supports various color formats, such as HEX, RGB, and RGBA, and also allows for user-defined thresholds and customizable default color settings. In addition, it now supports CSS color names, making it more versatile and easy to use.

https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef

<br>

## Features

- **Support for HEX, RGB, and RGBA color formats**   
Easily handle different color formats for flexible color manipulation.
- **Color contrast calculation with transparency (Alpha)**   
Accurately calculates contrast by considering alpha transparency, ensuring that the selected text color is always readable.
- **Support for user-defined brightness thresholds**   
Customize brightness thresholds to determine when to use high or low contrast colors.
- **Customizable high and low brightness colors**   
Define specific colors to use in high or low brightness scenarios for better visual clarity.
- **CSS Color Names Support**   
Conveniently use named colors defined in CSS, such as "red", "blue", "green", etc., for quick color application.
- **Easy to use and flexible settings**   
The library is designed to be simple to implement while providing flexibility in customization.

<br>

## Installation

```bash
# with npm
$ npm i color-contrast-finder

# with yarn
$ yarn add color-contrast-finder

# with pnpm
$ pnpm add color-contrast-finder
```

<br>

## Usage

Include the library in your project and use it to determine the best text color for any given background color, ensuring that your web content is accessible and easy to read.

```javascript
// module
import { findContrastColor } from 'color-contrast-finder';

/**
 * `options.color` types:
 *   - `#f00`        // Short HEX code (no alpha), interpreted as #ff0000 (RGB: 255, 0, 0)
 *   - `#f00f`       // Short HEX code with alpha, interpreted as #ff0000 with 100% opacity (RGBA: 255, 0, 0, 1)
 *   - `#ffffff`     // Full HEX code (no alpha), interpreted as RGB: 255, 255, 255
 *   - `#ffffffff`   // Full HEX code with alpha, interpreted as RGBA: 255, 255, 255, 1
 *   - `rgb(255, 255, 255)`   // RGB function, interpreted as RGB: 255, 255, 255
 *   - `rgba(255, 255, 255, 0.3)` // RGBA function, interpreted as RGBA: 255, 255, 255, 0.3
 *   - `'red'`       // CSS color name, interpreted as the corresponding color (e.g., 'red' = RGB: 255, 0, 0)
 */
const backgroundColor = '#3498db';
const options = {
  color: backgroundColor, // The input color (HEX, RGB, RGBA, or CSS color name)
  threshold: 0.5, // The brightness threshold to decide between highColor and lowColor (default: 0.5)
  highColor: 'black', // Text color to use when brightness is above the threshold (default: #000000)
  lowColor: 'white'   // Text color to use when brightness is below the threshold (default: #FFFFFF)
};

const contrastColor = findContrastColor(options);
console.log(contrastColor); // Outputs 'black' or 'white' depending on the contrast
```

```javascript
// umd

/**
 * html code
 * <script type="text/javascript" src="{path}/color-contrast-finder.umd.cjs"></script>
 */

const backgroundColor = '#3498db';
const options = {
  color: backgroundColor,
  threshold: 0.5,
  highColor: 'black',
  lowColor: 'white'
};

 const contrastColor = window['color-contrast-finder'].findContrastColor(options);
 console.log(contrastColor); // Outputs 'black' or 'white' depending on the contrast
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

## How to use publish (About me)

```bash
# 1. pnpm changeset
$ pnpm cs

# 2. Input next version

# 3. New file created in the .changeset folder

# 4. Commit & push new files

# 5. Automatically generate, merge, and publish PRs with CD jobs running. 
```

<br>