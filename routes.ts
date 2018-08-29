import Routes from 'next-routes'

const routes = new Routes()

routes
  .add('home', '/', 'index')
  .add('about', '/about', 'about')

export default routes
export const Link = routes.Link
export const Router = routes.Router
