import { createBrowserRouter } from 'react-router-dom'
import HomePage from './src/pages/HomePage'
import SignupPage from './src/pages/SignupPage'
import UserProfile from './src/pages/UserProfile'
import { checkAuthentication } from './src/utils/main'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <HomePage/>,
    },
    {
      path: '/signup',
      element: <SignupPage/>
    },
    {
      path: '/profile',
      element: <UserProfile/>,
      loader: async () => {
        const session = await checkAuthentication()
        const { products } = await (await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/get-products`, {credentials: 'include'})).json()
        console.log(products)
        return {session}
      }
    },
    {
      path: '*',
      element: <div>Not found</div>
    }
  ]
)

export default router