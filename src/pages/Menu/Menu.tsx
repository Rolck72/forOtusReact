import Headling from "../../components/Headling/Headling";
import ProductCard from "../../components/ProductCart/ProductCart";
import Search from "../../components/Search/Search";
import styles from './Menu.module.css'


export function Menu() {
  return (
    <>
      <div className={styles['head']}>
        <Headling>Меню</Headling>
        <Search placeholder="введите товар" />
      </div>
      <div>
          <ProductCard
            id={1}
            name = 'Наслажднение'
            description="Салями, руккола"
            image = '/product-demo.png'
            rating={4.5}
            price={300}
           />
      </div>
    </>
  )
}
