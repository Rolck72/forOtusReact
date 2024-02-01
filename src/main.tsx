import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom'

import { Cart } from './pages/Cart/Cart'
import { Error } from './pages/Error/Error'
import { Layout } from './layout/layout/Layout'
import { Product } from './pages/Product/Product'
import { PREFIX } from './API/API'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'
import { RequireAuth } from './API/RequireAuth'
import { Provider } from 'react-redux'
import { store } from './store_redux/store'

/* делаем ленивую загрузку */
const Menu = lazy(()=>import('./pages/Menu/Menu'))

/* Создаем объект router с использованием createBrowserRouter */
const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth><Layout /></RequireAuth>,
    children: [
      {
        path: '/',
        /* Используем Suspense для ленивой загрузки Menu с fallback-значением (то, что отображается во время загрузки) */
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
            
            data: new Promise<void>((resolve) => {
              setTimeout(async () => {
                try {
                  // Запрашиваем данные продукта с использованием fetch
                  const res = await fetch(`${PREFIX}/products/${params.id}`);
                  if (!res.ok) {  /* fetch - для выполнения HTTP-запросов */
                  }
                  // Преобразуем ответ в данные
                  const data = await res.json();
                  resolve(data);
                } catch (error) {
                  // Ловим ошибки и передаем их в useErrorHandler
                  resolve(Promise.reject(error));
                }
              }, 500);
            })
          });
        }
      }
    ]
  },
  
 
      {
          path: 'signin',
          element: <Login/>
      },
      {
        path: 'signup ',
        element: <Register/>
      },
  
  
  {
    path: '/*',
    element: <Error />
  }
])

/* Рендерим приложение внутри строгого режима */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
