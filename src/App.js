import React from 'react'
import { createBrowserHistory } from "history"

import Layout from './custom/Layout'
import {Admin, Resource} from 'react-admin'
import {_dataProvider, authProvider, i18nProvider} from './providers'
import {administrators, sample} from './components'

export const history = createBrowserHistory()
export const dataProvider = _dataProvider('Url-API-URL')

const App = () => <Admin
	locale='en'
	title={process.env.NODE_ENV === 'production' ? '관리자 - PROD' : '관리자 - DEV'}
	appLayout={Layout}
	authProvider={authProvider}
	dataProvider={dataProvider}
	i18nProvider={i18nProvider}
	history={history}>
	{() => [
		<Resource name='administrators' {...administrators} />,
		<Resource name='sample' {...sample} />,
	]}
</Admin>

export default App