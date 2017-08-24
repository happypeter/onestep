import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import '../style/login.css'

class Login extends Component {

 login = () => {
   this.props.dispatch({ type: 'IS_AUTH' })
   this.props.dispatch({ type: 'TO_REFERRER' })
 }

 render() {
   const refererState = this.props.location.state

   if (this.props.fakeAuth.redirectToReferrer && refererState ) {
     let refererPath = refererState.from.pathname
     return (
       <Redirect to={refererPath} />
     )
   }else if(this.props.fakeAuth.redirectToReferrer) {
     return (
       <Redirect to='/' />
     )
   }
   return (
     <div className="home">
       <button onClick={this.login} className='fake-code'>点击假装微信扫码登录</button>
     </div>
   )
 }
}

const mapStateToProps = (state) => ({
  fakeAuth: state.fakeAuth
})

export default connect(mapStateToProps)(Login)
