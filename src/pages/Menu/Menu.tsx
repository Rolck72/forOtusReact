import { useEffect, useState } from "react";
import { PREFIX } from "../../API/API";
import Headling from "../../components/Headling/Headling";
import Search from "../../components/Search/Search";
import { Product } from "../../interface/product.interface";
import styles from './Menu.module.css'
import { MenuList } from "./MenuList/MenuList";



export function Menu() {
  /* 2. работаем с массвом продуков через состояние  */
    
   const [products, setProducts] = useState<Product[]>([])

   /* 5. делаем состояние для обработки ошибок */
   const [error, setError] = useState<string | undefined>()


  /* 1. делаем асинхронную функцию через fetch */
  const getMenu = async() =>{
    
    try{
     
      const res = await fetch(`${PREFIX}/products`)
      if (!res.ok) {
        // Обрабатываем ошибку, если статус ответа не в диапазоне 200-299
        setError(`Ошибка: ${res.status} - ${res.statusText}`);
        return;
      }
      const responseData = await res.json();
      const data = responseData.data || [];
      setProducts(data);
     
    }catch(e){
       console.error(e)
       setError('Произошла ошибка при выполнении запроса');
       return
    }
    
  
  }
    /* 4. вызываем нашу функцию getMenu */
   useEffect(() => {
     getMenu()
   }, [getMenu])

  return (
    <>
      <div className={styles['head']}>
        <Headling>Меню</Headling>
        <Search placeholder="введите товар" />
      </div>
      <div>
       {error && <div>{error}</div>}
      {/* 3. раскидываем продукты через Map */}
      <MenuList product={products}/>
      </div>
    </>
  )
}

export default Menu