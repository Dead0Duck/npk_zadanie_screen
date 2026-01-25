module.exports = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            code: {
              '&::before': {
                content: 'none !important',
              },
              '&::after': {
                content: 'none !important',
              },
            },
            // 'blockquote p:first-of-type::before': false,
            // 'blockquote p:last-of-type::after': false,
          },
        },
      },
    },
  }
};