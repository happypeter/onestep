import React from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Loadable from 'react-loadable'
import LoadingComponent from '../common/Loading'

const AsyncSlogan = Loadable({
  loader: () => import('./Slogan'),
  loading: LoadingComponent,
  delay: 300,
})

export default () => (
  <div>
    <TopHeader />
    <AsyncSlogan />
  </div>
)
