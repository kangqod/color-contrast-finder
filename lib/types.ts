import { CSS_COLORS } from './constants'

export type RGBAColor = {
  r: number
  g: number
  b: number
  a: number
}

type CSSColorKey = keyof typeof CSS_COLORS

export type InputColor = CSSColorKey | string

export type ColorContrastOptions = {
  color: InputColor // css color | hex | rgb | rgba
  threshold?: number // brightness threshold
  highColor?: string // color to use when adjustedLuminance > luminanceThreshold
  lowColor?: string // color to use when adjustedLuminance <= luminanceThreshold
}
