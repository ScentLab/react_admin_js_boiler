import englishMessages from 'ra-language-english'
import treeEnglishMessages from 'ra-tree-language-english'
import {mergeTranslations} from 'react-admin'

export const messages = {
  simple: {
    action: {
      close: 'Close',
      save: 'Save',
    },
  },
  ...mergeTranslations(englishMessages, treeEnglishMessages),
  resources: {},
  Unauthorized: 'Unauthorized',
  user: {
    list: {
      search: 'Search',
    },
    form: {
      summary: 'Summary',
      security: 'Security',
    },
    edit: {
      title: 'User "%{title}"',
    },
    action: {
      save_and_add: 'Save and Add',
      save_and_show: 'Save and Show',
    },
  },
}

export default messages
