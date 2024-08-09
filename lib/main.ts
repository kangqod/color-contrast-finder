import { KEY_COLORS, DEFAULT_OPACITY } from './constants'
import type { ContrastColorOptions, RGBAColor } from './types'

/**
 * Converts HEX color code to RGB.
 * @param {string} hex - HEX color code (3 or 6 digits)
 * @returns {RGBAColor} RGB values
 */
function hexToRgb(hex: string): RGBAColor {
  // HEX 코드 유효성 검사 (3자리 또는 6자리만 허용)
  const validHex = /^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/

  if (!validHex.test(hex)) {
    throw new Error('Invalid HEX color code')
  }

  const cleanedHex = hex.replace(/^#/, '')
  const expandedHex =
    cleanedHex.length === 3
      ? cleanedHex
          .split('')
          .map((char) => char + char)
          .join('')
      : cleanedHex

  const bigint = parseInt(expandedHex, 16)
  return {
    r: (bigint >> 16) & 0xff,
    g: (bigint >> 8) & 0xff,
    b: bigint & 0xff,
    a: DEFAULT_OPACITY
  }
}

/**
 * Parses RGB or RGBA strings to RGBAColor.
 * @param {string} rgbString - RGB or RGBA string
 * @returns {RGBAColor | null} RGBA values or null if parsing fails
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
    a: a ? parseFloat(a) : DEFAULT_OPACITY
  }
}

/**
 * Converts a color string to RGBAColor.
 * @param {string} color - HEX, RGB, or RGBA color value
 * @returns {RGBAColor} RGBA color values
 */
function getColorValues(color: string): RGBAColor {
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
 * @param {ContrastColorOptions} options - Configuration for contrast color selection
 * @returns {string} Best contrast color for the text
 */
export function findContrastColor(options: ContrastColorOptions): string {
  const { color, threshold = 0.5, highColor = KEY_COLORS.BLACK, lowColor = KEY_COLORS.WHITE } = options

  const { r, g, b, a } = getColorValues(color)
  const luminance = getLuminance({ r, g, b })
  const backgroundLuminance = calculateBackgroundLuminance(a, luminance)

  console.log('threshold : ', threshold)
  return getContrastColor(backgroundLuminance, threshold, highColor, lowColor)
}

export type { ContrastColorOptions, RGBAColor }

export type Test = {
  name: string
}
