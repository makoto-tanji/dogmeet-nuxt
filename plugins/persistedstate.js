import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'dogmeet',
    storage: window.sessionStorage
  })(store)
}