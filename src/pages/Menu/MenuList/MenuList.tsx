import ProductCard from '../../../components/ProductCart/ProductCart'
import { MenuListprops } from './MenuList.props'
import styles from './MenuList.module.css';

{/* 3. раскидываем продукты через Map */}
export function MenuList({product}:MenuListprops) {
  return <div className={styles.wrapper}>{product.map(p => (
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
}
