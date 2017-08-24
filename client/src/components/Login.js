import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import '../style/login.css'

class Login extends Component {
  state = {
   redirectToReferrer: false
 }

 login = () => {
   this.props.fakeAuth.authenticate()
   this.setState({
     redirectToReferrer: true
   })
 }

 render() {
   const refererState = this.props.location.state

   if (this.state.redirectToReferrer && refererState ) {
     let refererPath = refererState.from.pathname
     return (
       <Redirect to={refererPath} />
     )
   }else if(this.state.redirectToReferrer) {
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
