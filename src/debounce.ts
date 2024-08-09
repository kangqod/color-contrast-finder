/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Debounce function to limit the rate at which a function is executed
 * @param {Function} func - The function to debounce
 * @param {number} wait - The debounce delay in milliseconds
 * @returns {Function} A debounced version of the input function
 */
export function debounce(func: (...args: any[]) => void, wait: number): (...args: any[]) => void {
  let timeout: number | undefined

  return function (...args: any[]) {
    window.clearTimeout(timeout)
    timeout = window.setTimeout(() => func(...args), wait)
  }
}
