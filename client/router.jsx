import { createBrowserRouter, redirect} from 'react-router-dom'
import HomePage from './src/pages/HomePage'
import UserProfile from './src/pages/UserProfile'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <HomePage/>
    },
    {
      path: '/profile',
      element: <UserProfile/>,
      loader: async () => {
        const session = await (await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/profile`, {credentials: 'include'})).json()
        
        if(session?.error && session.error === 'Unauthorized'){
          return redirect('/')
        }

        return session.data
      }
    }
  ]
)

export default router