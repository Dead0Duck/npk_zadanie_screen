const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
const rem = (px) => `${round(px / 16)}rem`
const em = (px, base) => `${round(px / base)}em`

const customModifier = {
  'duckxl': {
    css:
      {
        fontSize: rem(46),
        lineHeight: round(59 / 46),
        p: {
          marginTop: 0,
          marginBottom: 0,
        },
        '[class~="lead"]': {
          fontSize: em(40, 24),
          lineHeight: round(44 / 40),
          marginTop: em(32, 40),
          marginBottom: em(32, 40),
        },
        blockquote: {
          marginTop: 0,
          marginBottom: 0,
          paddingInlineStart: em(40, 36),
        },
        h1: {
          fontSize: em(64, 24),
          marginTop: '0',
          marginBottom: 0,
          lineHeight: round(64 / 64),
        },
        h2: {
          fontSize: em(48, 24),
          marginTop: 0,
          marginBottom: 0,
          lineHeight: round(52 / 48),
        },
        h3: {
          fontSize: em(36, 24),
          marginTop: 0,
          marginBottom: 0,
          lineHeight: round(44 / 36),
        },
        h4: {
          marginTop: 0,
          marginBottom: 0,
          lineHeight: round(36 / 24),
        },
        img: {
          marginTop: 0,
          marginBottom: 0,
        },
        picture: {
          marginTop: 0,
          marginBottom: 0,
        },
        'picture > img': {
          marginTop: '0',
          marginBottom: '0',
        },
        video: {
          marginTop: 0,
          marginBottom: 0,
        },
        kbd: {
          fontSize: em(20, 24),
          borderRadius: rem(6),
          paddingTop: 0,
          paddingInlineEnd: em(8, 46),
          paddingBottom: 0,
          paddingInlineStart: em(8, 46),
        },
        code: {
          fontSize: em(20, 46),
        },
        'h2 code': {
          fontSize: em(42, 48),
        },
        'h3 code': {
          fontSize: em(32, 36),
        },
        pre: {
          fontSize: em(20, 46),
          lineHeight: round(36 / 20),
          marginTop: 0,
          marginBottom: 0,
          borderRadius: rem(8),
          paddingTop: em(24, 20),
          paddingInlineEnd: em(32, 20),
          paddingBottom: em(24, 20),
          paddingInlineStart: em(32, 20),
        },
        ol: {
          marginTop: 0,
          marginBottom: 0,
          paddingInlineStart: em(38, 46),
        },
        ul: {
          marginTop: 0,
          marginBottom: 0,
          paddingInlineStart: em(38, 46),
        },
        li: {
          marginTop: 0,
          marginBottom: 0,
        },
        'ol > li': {
          paddingInlineStart: em(10, 46),
        },
        'ul > li': {
          paddingInlineStart: em(10, 46),
        },
        '> ul > li p': {
          marginTop: 0,
          marginBottom: 0,
        },
        '> ul > li > p:first-child': {
          marginTop: 0,
        },
        '> ul > li > p:last-child': {
          marginBottom: 0,
        },
        '> ol > li > p:first-child': {
          marginTop: 0,
        },
        '> ol > li > p:last-child': {
          marginBottom: 0,
        },
        'ul ul, ul ol, ol ul, ol ol': {
          marginTop: 0,
          marginBottom: 0,
        },
        dl: {
          marginTop: 0,
          marginBottom: 0,
        },
        dt: {
          marginTop: 0,
        },
        dd: {
          marginTop: 0,
          paddingInlineStart: em(38, 46),
        },
        hr: {
          marginTop: 0,
          marginBottom: 0,
        },
        'hr + *': {
          marginTop: '0',
        },
        'h2 + *': {
          marginTop: '0',
        },
        'h3 + *': {
          marginTop: '0',
        },
        'h4 + *': {
          marginTop: '0',
        },
        table: {
          fontSize: em(20, 46),
          lineHeight: round(28 / 42),
        },
        'thead th': {
          paddingInlineEnd: em(12, 42),
          paddingBottom: em(16, 42),
          paddingInlineStart: em(12, 42),
        },
        'thead th:first-child': {
          paddingInlineStart: '0',
        },
        'thead th:last-child': {
          paddingInlineEnd: '0',
        },
        'tbody td, tfoot td': {
          paddingTop: em(16, 42),
          paddingInlineEnd: em(12, 42),
          paddingBottom: em(16, 42),
          paddingInlineStart: em(12, 42),
        },
        'tbody td:first-child, tfoot td:first-child': {
          paddingInlineStart: '0',
        },
        'tbody td:last-child, tfoot td:last-child': {
          paddingInlineEnd: '0',
        },
        figure: {
          marginTop: 0,
          marginBottom: 0,
        },
        'figure > *': {
          marginTop: '0',
          marginBottom: '0',
        },
        figcaption: {
          fontSize: em(20, 46),
          lineHeight: round(32 / 42),
          marginTop: 0,
        },

        code: {
          '&::before': {
            content: 'none !important',
          },
          '&::after': {
            content: 'none !important',
          },
        },
      }
  }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      typography: () => ({
        ...customModifier,
      }),
    },
  }
};
console.log(module.exports.theme.extend.typography)