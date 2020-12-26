import netlifyIdentity from 'netlify-identity-widget'

export default function({redirect, store, route}) {

  if (!netlifyIdentity.currentUser() && route.path !== '/')  {
    return redirect('/')
  }

  if (!store.state.currentUser) {
    return store.commit('setCurrentUser', netlifyIdentity.currentUser())
  }

  // user
  const usuario = netlifyIdentity.currentUser()
  console.log('auth', usuario)

}