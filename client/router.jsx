import { createBrowserRouter, redirect} from 'react-router-dom'
import HomePage from './src/pages/HomePage'
import UserProfile from './src/pages/UserProfile'
import SignupPage from './src/pages/SignupPage'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <HomePage/>
    },
    {
      path: '/signup',
      element: <SignupPage/>
    },
    {
      path: '/profile',
      element: <UserProfile/>,
      loader: async (req, res) => {
        const session = await (await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/check-user-session`, {credentials: 'include'})).json()
        
        if(session?.error && session.error === 'Unauthorized'){
          return redirect('/')
        }

        const getProducts = await (await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/get-products`, {credentials: 'include'})).json()
        console.log(getProducts)

        return session
      }
    },
    {
      path: '*',
      element: <div>Not found</div>
    }
  ]
)

export default router