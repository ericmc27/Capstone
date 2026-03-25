import { createBrowserRouter, redirect } from 'react-router-dom'
import HomePage from './src/pages/HomePage'
import SignupPage from './src/pages/SignupPage'
import UserProfilePage from './src/pages/UserProfilePage'
import CheckoutPage from './src/pages/CheckoutPage'
import ConfirmationPage from './src/pages/ConfirmationPage'
import AdminPage from './src/pages/AdminPage'
import { checkAuthentication, getProducts } from './src/utils/main'


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/signup',
      element: <SignupPage />
    },
    {
      path: '/profile',
      element: <UserProfilePage />,
      loader: async () => {
        const session = await checkAuthentication()
        return { session }
      }
    },
    {
      path: '/checkout',
      element: <CheckoutPage/>,
      loader: async () => {
        const session = await checkAuthentication()
        return { ...session.userData }
      }
    },
    { 
      path: '/confirmation',
      element: <ConfirmationPage/>
    },
    {
      path: '/admin',
      element: <AdminPage/>,
      loader: async () => {
        try {
          return await getProducts()
        } catch (err) {
          if(err instanceof Response && err.status === 403){
            throw redirect('/')
          }
        }
      }
    },
    {
      path: '*',
      element: <div>Not found</div>
    }
  ]
)

export default router