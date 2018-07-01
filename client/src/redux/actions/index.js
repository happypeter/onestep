import { history } from '../../utils/routerUtils'

export const goto = path => dispatch => {
  history.push(path)
  dispatch({ type: 'GOTO', path })
}
