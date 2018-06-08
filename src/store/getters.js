const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  exclude: state => state.router.exclude,
  addticketIds: state => state.user.addticketIds,
}
export default getters
