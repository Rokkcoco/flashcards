import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { SomethingWentWrong } from '@/assets'
import { Layout, useAuthContext } from '@/components/ui/layout/layout'
import {
  DeckPage,
  DecksPage,
  Error404,
  ForgotPasswordPage,
  ProfilePage,
  SignInPage,
  SignUpPage,
} from '@/pages'
import { LearnDeckPage } from '@/pages/learn-deck-page'

const authRoutes: RouteObject[] = [
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
  { element: <LearnDeckPage />, path: '/learn/:id' },
]

export const router = createBrowserRouter([
  {
    children: [
      {
        children: [
          { children: privateRoutes, element: <PrivateRoutes /> },

          { children: authRoutes, element: <RedirectSignedUserToDecks /> },
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
  const { isAuthenticated } = useAuthContext()

  return isAuthenticated ? <Outlet /> : <Navigate to={'/sign-in'} />
}
function RedirectSignedUserToDecks() {
  const { isAuthenticated } = useAuthContext()

  return isAuthenticated ? <Navigate to={'/'} /> : <Outlet />
}
