import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom'

import { Cart } from './pages/Cart/Cart'
import { Error } from './pages/Error/Error'
import { Layout } from './layout/layout/Layout'
import { Product } from './pages/Product/Product'
import { PREFIX } from './API/API'

/* делаем ленивую загрузку */
const Menu = lazy(()=>import('./pages/Menu/Menu'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element:<Suspense fallback={<>загрузка...</>}> <Menu /></Suspense>
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/product/:id',
        element: <Product />,
        errorElement: <>Ошибка</>, 
        loader: async ({ params }) => {
          return defer({
            data: await fetch(`${PREFIX}/products/${params.id}`).then(data => data)
          })
          // try {
          //   const res = await fetch(`${PREFIX}/products/${params.id}`);
          //   const data = await res.json();
          //   return data;
          // } catch (error) {
          //   console.error(error);
      
          // }
        }
      }
    ]
  },
  {
    path: '/*',
    element: <Error />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
