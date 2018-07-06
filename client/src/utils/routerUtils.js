import createHistory from 'history/createBrowserHistory'

const genHistory = () => {
  if (typeof document !== 'undefined') {
    return createHistory()
  }
  return {}
}

export default genHistory()
