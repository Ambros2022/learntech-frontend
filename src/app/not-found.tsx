import Error404Page from 'src/views/Error404Page'
import FrontLayout from 'src/@core/layouts/FrontLayout'

// Async server component — call as function, not JSX, to satisfy @types/react 18.2 type checker
export default async function NotFound() {
  return FrontLayout({ children: <Error404Page /> })
}
