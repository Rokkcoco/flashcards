import type { Preview } from '@storybook/react'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import '../src/styles/index.scss'
import { withRouter } from 'storybook-addon-react-router-v6'
import { Provider } from 'react-redux'
import { store } from '../src/services'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withRouter,
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
}

export default preview
