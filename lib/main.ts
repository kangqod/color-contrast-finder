import { KEY_COLORS, DEFAULT_OPACITY, CSS_COLORS } from './constants'
import type { ColorContrastOptions, InputColor, RGBAColor } from './types'

/**
 * Converts a HEX color code to an RGBA color object.
 * Supports 3-digit (#RGB), 4-digit (#RGBA), 6-digit (#RRGGBB), and 8-digit (#RRGGBBAA) HEX codes.
 *
 * @param {string} hex - The HEX color code, which may include an optional alpha channel.
 * @returns {RGBAColor} An object containing the red, green, blue, and alpha (RGBA) values.
 * @throws {Error} If the provided HEX color code is invalid.
 */
function hexToRgb(hex: string): RGBAColor {
  const validHex = /^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$/

  if (!validHex.test(hex)) {
    throw new Error('Invalid HEX color code')
  }

  const cleanedHex = hex.replace(/^#/, '')

  let r: number,
    g: number,
    b: number,
    a: number = DEFAULT_OPACITY
  if (cleanedHex.length === 3 || cleanedHex.length === 4) {
    // 3 or 4 digit hex
    r = parseInt(cleanedHex[0] + cleanedHex[0], 16)
    g = parseInt(cleanedHex[1] + cleanedHex[1], 16)
    b = parseInt(cleanedHex[2] + cleanedHex[2], 16)
    if (cleanedHex.length === 4) {
      a = parseInt(cleanedHex[3] + cleanedHex[3], 16) / 255
    }
  } else {
    // 6 or 8 digit hex
    r = parseInt(cleanedHex.slice(0, 2), 16)
    g = parseInt(cleanedHex.slice(2, 4), 16)
    b = parseInt(cleanedHex.slice(4, 6), 16)
    if (cleanedHex.length === 8) {
      a = parseInt(cleanedHex.slice(6, 8), 16) / 255
    }
  }

  return { r, g, b, a }
}

/**
 * Parses RGB or RGBA strings to RGBAColor.
 * @param {string} rgbString - RGB or RGBA string
 * @returns {RGBAColor} RGBA values or null if parsing fails
 *
 * @note If the input is an RGB string without an alpha channel, the alpha value
 *       is set to a default value of `DEFAULT_OPACITY`.
 *
 * @throws {Error} If the provided RGB string is invalid.
 */
function parseRgb(rgbString: string): RGBAColor | null {
  const regex = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)/
  const match = regex.exec(rgbString)

  if (!match) {
    throw new Error('Invalid RGB color code')
  }

  const [, r, g, b, a] = match
  return {
    r: parseInt(r, 10),
    g: parseInt(g, 10),
    b: parseInt(b, 10),
    // Use DEFAULT_OPACITY if alpha is not provided (i.e., RGB format without alpha)
    a: a ? parseFloat(a) : DEFAULT_OPACITY
  }
}

/**
 * Converts a color string to RGBAColor.
 * @param {InputColor} inputColor - css color or HEX or RGB or RGBA color value
 * @returns {RGBAColor} RGBA color values
 */
function getColorValues(inputColor: InputColor): RGBAColor {
  let color = inputColor.trim().toLowerCase()

  if (color in CSS_COLORS) {
    color = CSS_COLORS[color as keyof typeof CSS_COLORS]
  }

  if (color.startsWith('#')) {
    return hexToRgb(color)
  } else if (color.startsWith('rgb')) {
    const rgbColor = parseRgb(color)
    if (rgbColor) {
      return rgbColor
    }
    throw new Error('Invalid RGB color format')
  }
  throw new Error('Invalid color format')
}

/**
 * Calculates the luminance of a color.
 * @param {Pick<RGBAColor, 'r' | 'g' | 'b'>} color - RGB components of the color
 * @returns {number} Luminance value between 0 and 1
 */
function getLuminance({ r, g, b }: Pick<RGBAColor, 'r' | 'g' | 'b'>): number {
  const calculateChannelLuminance = (value: number): number => {
    const normalized = value / 255
    return normalized <= 0.03928 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4)
  }

  const rLuminance = calculateChannelLuminance(r)
  const gLuminance = calculateChannelLuminance(g)
  const bLuminance = calculateChannelLuminance(b)

  return rLuminance * 0.2126 + gLuminance * 0.7152 + bLuminance * 0.0722
}

/**
 * Calculates the adjusted luminance of a color considering its alpha transparency.
 * @param {number} alpha - Alpha value of the color
 * @param {number} luminance - Luminance of the color without transparency
 * @returns {number} Adjusted luminance
 */
function calculateBackgroundLuminance(alpha: number, luminance: number): number {
  const whiteLuminance = getLuminance({ r: 255, g: 255, b: 255 })
  return alpha < 1 ? alpha * luminance + (1 - alpha) * whiteLuminance : luminance
}

/**
 * Determines the appropriate text color based on the contrast with the background color.
 * @param {number} luminance - Adjusted luminance of the background color
 * @param {number} threshold - Luminance threshold for contrast
 * @param {string} highColor - Color to use if luminance is above the threshold
 * @param {string} lowColor - Color to use if luminance is below the threshold
 * @returns {string} Text color with highest contrast
 */
function getContrastColor(luminance: number, threshold: number, highColor: string, lowColor: string): string {
  return luminance >= threshold ? highColor : lowColor
}

/**
 * Finds the best contrast color for text based on the provided options.
 * @param {ColorContrastOptions} options - Configuration for contrast color selection
 * @returns {string} Best contrast color for the text
 */
export function findContrastColor(options: ColorContrastOptions): string {
  const { color, threshold = 0.5, highColor = KEY_COLORS.BLACK, lowColor = KEY_COLORS.WHITE } = options

  const { r, g, b, a } = getColorValues(color)
  const luminance = getLuminance({ r, g, b })
  const backgroundLuminance = calculateBackgroundLuminance(a, luminance)

  return getContrastColor(backgroundLuminance, threshold, highColor, lowColor)
}

export type { ColorContrastOptions, RGBAColor }
