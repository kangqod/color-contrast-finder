import './style.css'
import { findContrastColor } from '../lib/main'
import { DEFAULT_INPUT_DELAY } from '../lib/constants'
import type { ContrastColorOptions } from '../lib/types'
import { debounce } from './debounce'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Contrast Color Finder</h1>
    <div class="card">
      <div class="flex">
        <label for="input-color">Input Color</label>
        <input type="text" id="input-color" placeholder="hex or rgb values" />
      </div>
      <div class="flex">
        <label for="input-threshold">Luminance Threshold</label>
        <input type="range" min="0.1" max="0.9" step="0.1" id="input-threshold" value="0.5">
        <span id="threshold-value">0.5</span>
      </div>
      <div class="flex">
        <label for="input-high-color">High Luminance Color</label>
        <input type="text" id="input-high-color" placeholder="#FFFFFF">
      </div>
      <div class="flex">
        <label for="input-low-color">Low Luminance Color</label>
        <input type="text" id="input-low-color" placeholder="#000000">
      </div>
      <div class="flex mt-10">
        <div id="div-result" style="color: white; background-color: black;">Input Color</div>
      </div>
    </div>
  </div>
`

function onSubmit() {
  const { value: color } = document.getElementById('input-color') as HTMLInputElement
  const { value: threshold } = document.getElementById('input-threshold') as HTMLInputElement
  const { value: highColor } = document.getElementById('input-high-color') as HTMLInputElement
  const { value: lowColor } = document.getElementById('input-low-color') as HTMLInputElement

  const options: ContrastColorOptions = {
    color
  }

  if (threshold) {
    options.threshold = parseFloat(threshold)
  }
  if (highColor) {
    options.highColor = highColor
  }
  if (lowColor) {
    options.lowColor = lowColor
  }

  try {
    const resultColor = findContrastColor(options)
    document.getElementById('div-result')!.style.backgroundColor = options.color
    document.getElementById('div-result')!.style.color = resultColor
    document.getElementById('div-result')!.textContent = `${resultColor}`
  } catch (err) {
    console.error(err)
    document.getElementById('div-result')!.style.backgroundColor = 'red'
    document.getElementById('div-result')!.style.color = 'white'
    document.getElementById('div-result')!.textContent = 'Invalid color format'
  }
}

document.getElementById('input-color')?.addEventListener(
  'input',
  debounce((event: Event) => {
    const target = event.target as HTMLInputElement
    const colorValue = target?.value ?? ''
    if (!colorValue) {
      document.getElementById('div-result')!.style.backgroundColor = 'black'
      document.getElementById('div-result')!.style.color = 'white'
      document.getElementById('div-result')!.textContent = 'Input Color'
      return
    }

    onSubmit()
  }, DEFAULT_INPUT_DELAY)
)

document.getElementById('input-threshold')?.addEventListener(
  'input',
  debounce((event: Event) => {
    const target = event.target as HTMLInputElement
    const thresholdValue = target?.value ?? ''

    document.getElementById('threshold-value')!.textContent = thresholdValue

    onSubmit()
  }, DEFAULT_INPUT_DELAY)
)

document.getElementById('input-high-color')?.addEventListener(
  'input',
  debounce(() => {
    onSubmit()
  }, DEFAULT_INPUT_DELAY)
)

document.getElementById('input-low-color')?.addEventListener(
  'input',
  debounce(() => {
    onSubmit()
  }, DEFAULT_INPUT_DELAY)
)

// Example usage
const options: ContrastColorOptions = {
  color: 'rgba(100, 150, 200, 0.8)', // or hex color like '#1E90FF'
  threshold: 0.5,
  highColor: 'white',
  lowColor: 'black'
}

const contrastColor = findContrastColor(options)
console.log(contrastColor) // Output: 'white' or 'black' based on luminance

findContrastColor({
  color: '#ff5733',
  threshold: 0.5,
  highColor: '#000000', // 명도 높을 때 색상
  lowColor: '#FFFFFF' // 명도 낮을 때 색상
})
