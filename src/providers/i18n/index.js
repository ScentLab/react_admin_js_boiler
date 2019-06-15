import localeMessages from './ko'

const messages = {
  ko: () => import('./ko').then(messages => messages.default),
}

export default locale => {
  return locale === 'ko' ?
    messages[locale]() :
    localeMessages
}
