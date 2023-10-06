import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/**
 * View components 
 */
import CryptoDetail from './views/CryptoDetail.tsx';
import Error from './views/Error.tsx';
import Home from './views/Home.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/detail/:id',
    element: <CryptoDetail />
  },
  {
    path: '/error',
    element: <Error />
  }
])

export default function Router() {
  return (
    <RouterProvider router={router} />
  )
}