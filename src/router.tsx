import { Navigate, RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Layout } from '@/components/ui'
import { Decks, ForgotPasswordPage, ProfilePage, SignInPage, SignUpPage } from '@/pages'
import { Error404 } from '@/pages/error-404'

const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
    errorElement: <Error404 />,
    path: '/sign-in',
  },
  {
    element: <SignUpPage />,
    path: '/sign-up',
  },
  {
    element: <ForgotPasswordPage />,
    path: '/forgot-password',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <Decks />,
    path: '/',
  },
  {
    element: <ProfilePage />,
    path: '/profile',
  },
]

const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
    errorElement: <Error404 />,
  },
  ...publicRoutes,
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Layout /> : <Navigate to={'/sign-in'} />
}
