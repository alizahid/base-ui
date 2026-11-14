import createMiddleware from 'next-intl/middleware'

import { routing } from './intl/routing'

export default createMiddleware(routing)

export const config = {
  // dotted paths are files, bar the .md version of a page
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/(.*)\\.md'],
}
