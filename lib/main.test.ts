import { describe, it, expect } from 'vitest'
import { KEY_COLORS } from './constants'
import { findContrastColor } from './main'

describe('findContrastColor', () => {
  it('should return highColor when BLACK is above the threshold', () => {
    const options = {
      color: 'rgba(255, 0, 0, 1)',
      threshold: 0.5,
      highColor: KEY_COLORS.BLACK,
      lowColor: KEY_COLORS.WHITE
    }
    expect(findContrastColor(options)).toBe(KEY_COLORS.WHITE)
  })

  it('should return lowColor when luminance WHITE below the threshold', () => {
    const options = {
      color: 'rgba(0, 0, 0, 1)',
      threshold: 0.5,
      highColor: KEY_COLORS.BLACK,
      lowColor: KEY_COLORS.WHITE
    }
    expect(findContrastColor(options)).toBe(KEY_COLORS.WHITE)
  })

  it('should handle HEX color input', () => {
    const options = {
      color: '#FF5733',
      threshold: 0.5,
      highColor: KEY_COLORS.BLACK,
      lowColor: KEY_COLORS.WHITE
    }
    expect(findContrastColor(options)).toBe(KEY_COLORS.WHITE)
  })

  it('should use default colors when not provided', () => {
    const options = {
      color: 'rgba(0, 0, 0, 0.5)',
      threshold: 0.5
    }
    expect(findContrastColor(options)).toBe(KEY_COLORS.BLACK)
  })

  it('should handle RGB color input', () => {
    const options = {
      color: 'rgb(0, 128, 255)',
      threshold: 0.5,
      highColor: KEY_COLORS.BLACK,
      lowColor: KEY_COLORS.WHITE
    }
    expect(findContrastColor(options)).toBe(KEY_COLORS.WHITE)
  })

  it('should handle invalid color formats', () => {
    expect(() =>
      findContrastColor({
        color: 'invalidColor',
        threshold: 0.5,
        highColor: KEY_COLORS.BLACK,
        lowColor: KEY_COLORS.WHITE
      })
    ).toThrow('Invalid color format')
  })

  it('should handle rgba color with transparency correctly', () => {
    const options = {
      color: 'rgba(0, 0, 255, 0.3)',
      threshold: 0.5,
      highColor: KEY_COLORS.BLACK,
      lowColor: KEY_COLORS.WHITE
    }
    expect(findContrastColor(options)).toBe(KEY_COLORS.BLACK)
  })
})
