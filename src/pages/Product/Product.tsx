import { Await, useLoaderData } from 'react-router'
import { Product } from '../../interface/product.interface'
import { Suspense } from 'react'

export function Product() {
  // Используем хук useLoaderData для получения данных, которые были загружены перед рендерингом компонента
  const data = useLoaderData() as { data: Product }

  return (
    <>
      {/* Оборачиваем компонент в Suspense с fallback-значением
			 (то, что отображается во время загрузки) */}
      <Suspense fallback={'Загружаю'}>
        {/* Используем компонент Await для дожидания разрешения 
				(загрузки) данных */}
        <Await resolve={data.data}>
          {/* Деструктурируем объект data из компонента Await */}
          {({ data }: { data: Product }) => (
            <>
              {/* Отображаем данные продукта */}
              Product - {data.name}
            </>
          )}
        </Await>
      </Suspense>
    </>
  )
}
