const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')

const svgToDataUri = require('mini-svg-data-uri')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        scroll:
          'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
      },
      keyframes: {
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
      },
    },
  },
  plugins: [
    addVariablesForColors,
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'bg-poly': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg id="visual" viewBox="0 0 960 200" width="960" height="200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><g stroke-width="1" stroke-linejoin="bevel"><path d="M450.1 76.7L385.2 71.7L431.1 137.3Z" fill="#e1e1e1" stroke="#e1e1e1"></path><path d="M385.2 71.7L349.2 137.3L431.1 137.3Z" fill="#d8dcdf" stroke="#d8dcdf"></path><path d="M450.1 76.7L433.1 0L385.2 71.7Z" fill="#d8dcdf" stroke="#d8dcdf"></path><path d="M376.2 200L435.1 200L431.1 137.3Z" fill="#dddee0" stroke="#dddee0"></path><path d="M534.9 126.3L522.9 51.7L450.1 76.7Z" fill="#b9cad8" stroke="#b9cad8"></path><path d="M349.2 137.3L376.2 200L431.1 137.3Z" fill="#c7d2db" stroke="#c7d2db"></path><path d="M433.1 0L372.2 0L385.2 71.7Z" fill="#e1e1e1" stroke="#e1e1e1"></path><path d="M385.2 71.7L303.4 73.7L349.2 137.3Z" fill="#c7d2db" stroke="#c7d2db"></path><path d="M372.2 0L303.4 73.7L385.2 71.7Z" fill="#d8dcdf" stroke="#d8dcdf"></path><path d="M349.2 137.3L281.4 200L376.2 200Z" fill="#d8dcdf" stroke="#d8dcdf"></path><path d="M534.9 126.3L450.1 76.7L431.1 137.3Z" fill="#d4d9de" stroke="#d4d9de"></path><path d="M450.1 76.7L499.9 0L433.1 0Z" fill="#c2cfda" stroke="#c2cfda"></path><path d="M514.9 200L534.9 126.3L431.1 137.3Z" fill="#cfd7dd" stroke="#cfd7dd"></path><path d="M522.9 51.7L499.9 0L450.1 76.7Z" fill="#c2cfda" stroke="#c2cfda"></path><path d="M435.1 200L514.9 200L431.1 137.3Z" fill="#b9cad8" stroke="#b9cad8"></path><path d="M303.4 73.7L276.4 150.3L349.2 137.3Z" fill="#cfd7dd" stroke="#cfd7dd"></path><path d="M372.2 0L289.4 0L303.4 73.7Z" fill="#c7d2db" stroke="#c7d2db"></path><path d="M303.4 73.7L227.5 134.3L276.4 150.3Z" fill="#dddee0" stroke="#dddee0"></path><path d="M514.9 200L576.8 140.3L534.9 126.3Z" fill="#d4d9de" stroke="#d4d9de"></path><path d="M534.9 126.3L576.8 50.7L522.9 51.7Z" fill="#cfd7dd" stroke="#cfd7dd"></path><path d="M522.9 51.7L584.8 0L499.9 0Z" fill="#c7d2db" stroke="#c7d2db"></path><path d="M276.4 150.3L281.4 200L349.2 137.3Z" fill="#becdd9" stroke="#becdd9"></path><path d="M576.8 140.3L576.8 50.7L534.9 126.3Z" fill="#dddee0" stroke="#dddee0"></path><path d="M203.5 70.7L227.5 134.3L303.4 73.7Z" fill="#e1e1e1" stroke="#e1e1e1"></path><path d="M276.4 150.3L239.5 200L281.4 200Z" fill="#c2cfda" stroke="#c2cfda"></path><path d="M654.6 71.7L584.8 0L576.8 50.7Z" fill="#c7d2db" stroke="#c7d2db"></path><path d="M576.8 50.7L584.8 0L522.9 51.7Z" fill="#cbd4dc" stroke="#cbd4dc"></path><path d="M227.5 134.3L239.5 200L276.4 150.3Z" fill="#becdd9" stroke="#becdd9"></path><path d="M289.4 0L231.5 0L303.4 73.7Z" fill="#c7d2db" stroke="#c7d2db"></path><path d="M514.9 200L600.8 200L576.8 140.3Z" fill="#d8dcdf" stroke="#d8dcdf"></path><path d="M576.8 140.3L654.6 71.7L576.8 50.7Z" fill="#d4d9de" stroke="#d4d9de"></path><path d="M231.5 0L203.5 70.7L303.4 73.7Z" fill="#e1e1e1" stroke="#e1e1e1"></path><path d="M227.5 134.3L143.7 146.3L239.5 200Z" fill="#b5c8d7" stroke="#b5c8d7"></path><path d="M676.6 142.3L654.6 71.7L576.8 140.3Z" fill="#d8dcdf" stroke="#d8dcdf"></path><path d="M600.8 200L676.6 142.3L576.8 140.3Z" fill="#b9cad8" stroke="#b9cad8"></path><path d="M139.7 69.7L143.7 146.3L203.5 70.7Z" fill="#dddee0" stroke="#dddee0"></path><path d="M203.5 70.7L143.7 146.3L227.5 134.3Z" fill="#c2cfda" stroke="#c2cfda"></path><path d="M729.5 79.7L673.6 0L654.6 71.7Z" fill="#dddee0" stroke="#dddee0"></path><path d="M654.6 71.7L673.6 0L584.8 0Z" fill="#c2cfda" stroke="#c2cfda"></path><path d="M146.7 0L139.7 69.7L203.5 70.7Z" fill="#d8dcdf" stroke="#d8dcdf"></path><path d="M600.8 200L683.6 200L676.6 142.3Z" fill="#c7d2db" stroke="#c7d2db"></path><path d="M676.6 142.3L729.5 79.7L654.6 71.7Z" fill="#becdd9" stroke="#becdd9"></path><path d="M231.5 0L146.7 0L203.5 70.7Z" fill="#cbd4dc" stroke="#cbd4dc"></path><path d="M83.8 129.3L131.7 200L143.7 146.3Z" fill="#e1e1e1" stroke="#e1e1e1"></path><path d="M143.7 146.3L131.7 200L239.5 200Z" fill="#becdd9" stroke="#becdd9"></path><path d="M734.5 145.3L729.5 79.7L676.6 142.3Z" fill="#e1e1e1" stroke="#e1e1e1"></path><path d="M683.6 200L734.5 145.3L676.6 142.3Z" fill="#dddee0" stroke="#dddee0"></path><path d="M683.6 200L725.5 200L734.5 145.3Z" fill="#d4d9de" stroke="#d4d9de"></path><path d="M139.7 69.7L83.8 129.3L143.7 146.3Z" fill="#e1e1e1" stroke="#e1e1e1"></path><path d="M72.8 81.7L83.8 129.3L139.7 69.7Z" fill="#d8dcdf" stroke="#d8dcdf"></path><path d="M828.3 77.7L736.5 0L729.5 79.7Z" fill="#cfd7dd" stroke="#cfd7dd"></path><path d="M729.5 79.7L736.5 0L673.6 0Z" fill="#becdd9" stroke="#becdd9"></path><path d="M77.8 0L72.8 81.7L139.7 69.7Z" fill="#b5c8d7" stroke="#b5c8d7"></path><path d="M146.7 0L77.8 0L139.7 69.7Z" fill="#c7d2db" stroke="#c7d2db"></path><path d="M0 119.3L64.8 200L83.8 129.3Z" fill="#cbd4dc" stroke="#cbd4dc"></path><path d="M83.8 129.3L64.8 200L131.7 200Z" fill="#d4d9de" stroke="#d4d9de"></path><path d="M0 119.3L83.8 129.3L72.8 81.7Z" fill="#e1e1e1" stroke="#e1e1e1"></path><path d="M725.5 200L805.3 200L734.5 145.3Z" fill="#b5c8d7" stroke="#b5c8d7"></path><path d="M734.5 145.3L818.3 134.3L729.5 79.7Z" fill="#c7d2db" stroke="#c7d2db"></path><path d="M805.3 200L818.3 134.3L734.5 145.3Z" fill="#e1e1e1" stroke="#e1e1e1"></path><path d="M818.3 134.3L828.3 77.7L729.5 79.7Z" fill="#dddee0" stroke="#dddee0"></path><path d="M0 48.7L0 119.3L72.8 81.7Z" fill="#c7d2db" stroke="#c7d2db"></path><path d="M77.8 0L0 48.7L72.8 81.7Z" fill="#e1e1e1" stroke="#e1e1e1"></path><path d="M828.3 77.7L826.3 0L736.5 0Z" fill="#b9cad8" stroke="#b9cad8"></path><path d="M77.8 0L0 0L0 48.7Z" fill="#cbd4dc" stroke="#cbd4dc"></path><path d="M0 119.3L0 200L64.8 200Z" fill="#cbd4dc" stroke="#cbd4dc"></path><path d="M805.3 200L867.2 128.3L818.3 134.3Z" fill="#e1e1e1" stroke="#e1e1e1"></path><path d="M818.3 134.3L867.2 128.3L828.3 77.7Z" fill="#d4d9de" stroke="#d4d9de"></path><path d="M886.2 50.7L872.2 0L826.3 0Z" fill="#dddee0" stroke="#dddee0"></path><path d="M886.2 50.7L826.3 0L828.3 77.7Z" fill="#cbd4dc" stroke="#cbd4dc"></path><path d="M867.2 128.3L886.2 50.7L828.3 77.7Z" fill="#b9cad8" stroke="#b9cad8"></path><path d="M805.3 200L903.2 200L867.2 128.3Z" fill="#c7d2db" stroke="#c7d2db"></path><path d="M867.2 128.3L960 118.3L886.2 50.7Z" fill="#becdd9" stroke="#becdd9"></path><path d="M903.2 200L960 118.3L867.2 128.3Z" fill="#d4d9de" stroke="#d4d9de"></path><path d="M886.2 50.7L960 0L872.2 0Z" fill="#d4d9de" stroke="#d4d9de"></path><path d="M960 118.3L960 47.7L886.2 50.7Z" fill="#dddee0" stroke="#dddee0"></path><path d="M960 47.7L960 0L886.2 50.7Z" fill="#e1e1e1" stroke="#e1e1e1"></path><path d="M903.2 200L960 200L960 118.3Z" fill="#c2cfda" stroke="#c2cfda"></path></g></svg>`
            )}")`,
          }),
          'bg-grid': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          'bg-grid-small': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          'bg-dot': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
      )
    },
  ],
}

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )

  addBase({
    ':root': newVars,
  })
}
