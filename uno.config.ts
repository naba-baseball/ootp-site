import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno, transformerVariantGroup } from 'unocss'
import { presetRadix } from 'unocss-preset-radix'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetRadix({ palette: ['sky', 'slate'], aliases: { gray: 'slate', primary: 'sky' } })],
  transformers: [transformerVariantGroup()],
  preflights: [
    { getCSS: ({ theme }) => `
      * {
        font-family: ${theme.fontFamily.body};
      }
      h1,h2,h3,h4,h5,h6 {
          font-family: ${theme.fontFamily.display};
          text-transform: uppercase;
      }
      h1 {
          font-size: ${theme.fontSize['5xl'][0]};
      }
      h2 {
          font-size: ${theme.fontSize['4xl'][0]};
      }
      h3 {
          font-size: ${theme.fontSize['3xl'][0]};
      }
      h4 {
          font-size: ${theme.fontSize['2xl'][0]};
      }
      h5 {
          font-size: ${theme.fontSize.xl[0]};
      }
      h6 {
          font-size: ${theme.fontSize.lg[0]};
      }
      ` },
  ],
  theme: {
    fontFamily: {
      display: ['Vollkorn', 'serif'],
      body: ['Lora', 'serif'],
    },
    borderRadius: {
      DEFAULT: '0.5rem',
    },
  },
})
