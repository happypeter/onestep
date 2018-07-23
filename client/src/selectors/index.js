export const getIsAuthenticated = state => state.auth.isAuthenticated

export const getIsDrawerOpen = state =>
  (state.common && state.common.isDrawerOpen) || false

export const getIsDrawerFirstLoad = state =>
  state.common && state.common.isDrawerFirstLoad

export const getCurrentUser = state => state.auth.currentUser || {}
