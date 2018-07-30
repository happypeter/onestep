import React, { Component } from 'react'
import { SheetsRegistry } from 'react-jss/lib/jss'
import JssProvider from 'react-jss/lib/JssProvider'
import {
  MuiThemeProvider,
  createGenerateClassName
} from '@material-ui/core/styles'
import theme from './src/theme'

export default {
  getSiteData: () => ({
    title: 'React Static'
  }),
  getRoutes: async () => [
    {
      path: '/',
      component: 'src/containers/HomeContainer'
    },
    {
      path: '/profile',
      component: 'src/containers/ProfileContainer'
    },
    {
      path: '/login',
      component: 'src/containers/LoginContainer'
    },
    {
      path: '/signup',
      component: 'src/containers/SignupContainer'
    },
    {
      is404: true,
      component: 'src/containers/404'
    }
  ],
  renderToHtml: (render, Comp, meta) => {
    // Create a sheetsRegistry instance.
    const sheetsRegistry = new SheetsRegistry()

    const generateClassName = createGenerateClassName()

    const html = render(
      <JssProvider
        registry={sheetsRegistry}
        generateClassName={generateClassName}
      >
        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
          <Comp />
        </MuiThemeProvider>
      </JssProvider>
    )

    meta.jssStyles = sheetsRegistry.toString()

    return html
  },
  Document: class CustomHtml extends Component {
    render() {
      const { Html, Head, Body, children, renderMeta } = this.props

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <title>好奇猫</title>
            <link rel="shortcut icon" type="image/png" href="/favicon.png" />
            <meta name="description" content="React 好奇猫" />
            <meta name="keywords" content="React " />
          </Head>
          <Body>
            {children}
            <style id="jss-server-side">{renderMeta.jssStyles}</style>
          </Body>
        </Html>
      )
    }
  }
}
