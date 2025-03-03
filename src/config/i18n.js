import i18n from 'i18n'

i18n.configure({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  directory: './src/locales',
  objectNotation: true
})

export default i18n
