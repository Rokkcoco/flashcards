import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { SomethingWentWrong } from '@/assets'
import { Layout } from '@/components/ui'
import {
  DeckPage,
  DecksPage,
  Error404,
  ForgotPasswordPage,
  ProfilePage,
  SignInPage,
  SignUpPage,
} from '@/pages'

const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
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
    element: <DecksPage />,
    path: '/',
  },
  {
    element: <DeckPage />,
    path: '/deck/:id',
  },
  {
    element: <ProfilePage />,
    path: '/profile',
  },
]

// const router = createBrowserRouter([
//   {
//     children: [{ children: privateRoutes, element: <PrivateRoutes /> }, ...publicRoutes],
//     element: <Layout />,
//     errorElement: <Error404 />,
//   },
// ])

const router = createBrowserRouter([
  {
    children: [
      {
        children: [
          { children: privateRoutes, element: <PrivateRoutes /> },
          ...publicRoutes,
          {
            element: <Error404 />,
            path: '*',
          },
        ],
        errorElement: <SomethingWentWrong />,
      },
    ],
    element: <Layout />,
    path: '/',
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={'/sign-in'} />
}
