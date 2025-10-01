// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ml'], // English and Malayalam
  },
  localePath: typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/locales',
};
