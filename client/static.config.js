import React, { Component } from 'react'
import { SheetsRegistry } from 'react-jss/lib/jss'
import JssProvider from 'react-jss/lib/JssProvider'
import {
  MuiThemeProvider,
  createGenerateClassName
} from '@material-ui/core/styles'
import axios from 'axios'
import theme from './src/theme'
import config from './src/config/config'

export default {
  getSiteData: () => ({
    title: '好奇猫'
  }),
  getRoutes: async () => {
    const res = await axios.get(`${config.api}/course`)
    const { course: posts } = res.data

    return [
      {
        path: '/',
        component: 'src/containers/HomeContainer'
      },
      {
        path: '/profile',
        component: 'src/containers/ProfileContainer'
      },
      {
        path: '/coin',
        component: 'src/containers/CourseContainer',
        getData: () => ({
          posts
        }),
        children: posts.map(post => ({
          path: `${post.link}`,
          component: 'src/containers/EpisodeContainer',
          getData: () => ({
            post
          })
        }))
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
    ]
  },
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
            <meta name="description" content="好奇猫" />
            <meta name="keywords" content="btc" />
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
