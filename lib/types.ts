export type ContrastColorOptions = {
  color: string // hex, rgb, rgba
  threshold?: number // brightness threshold
  highColor?: string // color to use when adjustedLuminance > luminanceThreshold
  lowColor?: string // color to use when adjustedLuminance <= luminanceThreshold
}

export type RGBAColor = {
  r: number
  g: number
  b: number
  a: number
}
