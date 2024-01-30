import { useEffect, useState } from "react";
import { PREFIX } from "../../API/API";
import Headling from "../../components/Headling/Headling";
import ProductCard from "../../components/ProductCart/ProductCart";
import Search from "../../components/Search/Search";
import { Product } from "../../interface/product.interface";
import styles from './Menu.module.css'



export function Menu() {
  /* 2. работаем с массвом продуков через состояние  */
    
   const [products, setProducts] = useState<Product[]>([])

 


  /* 1. делаем асинхронную функцию через fetch */
  const getMenu = async() =>{
    
    try{
     
      const res = await fetch(`${PREFIX}/products`)
      if(!res.ok) {return}
      const responseData = await res.json();
      const data = responseData.data || [];
      setProducts(data);
     
    }catch(e){
       console.error(e)
       
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
      {/* 3. раскидываем продукты через Map */}
       {products.map(p =>(
            <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            description={p.desc}
            rating={p.oldPrice}
            price={p.price}
            image={p.photo}
           />
       ))}
        
      </div>
    </>
  )
}
