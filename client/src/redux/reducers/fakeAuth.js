let fakeAuth = {
 isAuthenticated: false,
 authenticate() {
   this.isAuthenticated = true
   console.log(this.isAuthenticated)
 }
}

export default function coursesReducer(state=fakeAuth, action) {
  return state
}
