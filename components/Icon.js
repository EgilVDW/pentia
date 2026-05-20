/**
 * @module Components
 * @category components
 */

/**
 * @file Icon component documentation
 *
 * A Vue component that dynamically loads and renders SVG icons
 * from the `assets/icons` directory using Vite's import.meta.glob.
 */

/**
 * Icon Component
 *
 * Dynamically renders an SVG icon based on the provided name prop.
 *
 * @component
 *
 * @example
 * <Icon name="home" />
 *
 * @remarks
 * - Uses Vite `import.meta.glob` with `eager: true`
 * - Loads SVG files as raw strings (`?raw`)
 * - Renders SVG via `v-html`
 * - Only works in Vite environments
 *
 * @prop {String} name - The filename of the SVG icon (without `.svg`)
 *
 * @computed {String|null} svgContent
 * Returns the raw SVG string for the requested icon.
 *
 * @returns {String|null} SVG markup or null if not found
 */
