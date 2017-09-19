import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Home from './home'
import Content from './content'

const App = () => (
<Router>
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/content/:contentId' component={Content} />
  </Switch>
</Router>
)

export default App
