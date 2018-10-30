import React, { Component } from 'react'
import { SheetsRegistry } from 'react-jss/lib/jss'
import JssProvider from 'react-jss/lib/JssProvider'
import {
  MuiThemeProvider,
  createGenerateClassName
} from '@material-ui/core/styles'
import fs from 'fs'
import theme from './src/theme'
import config from './src/config/config'

const docRepo = config.docRepo
export default {
  siteRoot: config.siteRoot,
  getSiteData: () => ({
    title: '好奇猫'
  }),
  getRoutes: async () => {
    const courses = JSON.parse(fs.readFileSync(`${docRepo}/index.json`, 'utf8'))
    return [
      {
        path: '/',
        component: 'src/containers/HomeContainer',
        getData: () => ({ courses })
      },
      {
        path: '/profile',
        component: 'src/containers/ProfileContainer'
      },
      ...courses.published.map(course => {
        const toc = JSON.parse(
          fs.readFileSync(`${docRepo}${course.link}/doc/index.json`),
          'utf8'
        )
        const posts = toc.content.reduce((sum, part) => {
          return sum.concat(part.section)
        }, [])
        return {
          path: course.link,
          component: 'src/containers/CourseContainer',
          getData: () => ({ cid: course.link.slice(1), toc, posts }),
          children: posts.map(post => {
            const markdown =
              post.link === '#'
                ? ''
                : fs.readFileSync(
                    `${docRepo}${course.link}/doc/${post.link}.md`,
                    'utf8'
                  )
            return {
              path: post.link,
              component: `src/containers/EpisodeContainer`,
              getData: () => ({
                post,
                posts,
                markdown,
                price: toc.price
              })
            }
          })
        }
      }),
      {
        path: '/login',
        component: 'src/containers/LoginContainer'
      },
      {
        path: '/signup',
        component: 'src/containers/SignupContainer'
      },
      {
        path: '/steps',
        component: 'src/containers/StepsContainer'
      },
      {
        path: '/open',
        component: 'src/containers/OpenContainer'
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
