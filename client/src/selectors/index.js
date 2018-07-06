export const getIsAuthenticated = state => state.auth.isAuthenticated

export const getIsDrawerOpen = state => (state.common && state.common.isDrawerOpen) || false
