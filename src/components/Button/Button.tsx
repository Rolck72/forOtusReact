import { ButtonProps } from "./Button.props"
import cn from 'classnames'
import styles from  './Button.module.css'


function Button ( {children, className,apperence = 'small', ...props} : ButtonProps) {

	return(
     <button className={ cn(styles['button'],styles['accent'], className,{
		  [styles['small']]: apperence === 'small',
			[styles['big']]: apperence === 'big',
			})} {...props} > {children} </button>
	)
}

export default Button