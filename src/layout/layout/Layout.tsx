import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import styles from './Layout.module.css'
import Button from '../../components/Button/Button'

import cn from 'classnames'

export function Layout() {
  
  const navigate = useNavigate()
  
  // кнопка выход из логина
  const logout = () => {
    localStorage.removeItem('jwt')
    navigate('/signin')
  }
   
   
   
  return (
    <div className={styles['layout']}>
      <div className={styles['sidebar']}>
        <div className={styles['user']}>
          <img src='/logo.png' alt='аватар пользователя' />
          <div className={styles['name']}>Юрий</div>
          <div className={styles['email']}>Rolck@yandex.ru</div>
        </div>

        <div className={styles['menu']}>
          {/* иконки для кнопок, ссылки корзина-меню*/}

          <NavLink to='/' className={({isActive}) => cn(styles['link'],{
            [styles.active]:isActive
          })}>
            <img src='/pizza.svg' alt='Иконка меню' />
            Меню
          </NavLink>

          <NavLink to='/cart'className={({isActive}) => cn(styles['link'],{
							[styles.active]:isActive
						})}>
						<img src='/cart-icon.svg' alt='Иконка корзины' />
              Корзина
            </NavLink>
          
        </div>
        <Button apperence="small" className={styles['exit']} onClick={logout}>
      <img src="/exit-icon.svg" alt="Иконка выхода" />
      Выход
    </Button>
      </div>
      <div className={styles['content']}>
        <Outlet />
      </div>
    </div>
)
}
