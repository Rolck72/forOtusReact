
import { HTMLAttributes, ReactNode } from "react";

// для компонента заголовка, который может принимать любые стандартные атрибуты элемента
export interface HeadlingProps extends HTMLAttributes<HTMLHeadingElement>{
	children: ReactNode
}