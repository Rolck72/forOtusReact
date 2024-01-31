import { ReactNode } from 'react'
import { Navigate } from 'react-router'

export const RequireAuth = ( {children}:{children: ReactNode} ) =>{
	 const jwt = localStorage.getItem('jwt')

	 if (!jwt){
		return <Navigate to="/signin" replace/>
	 }
	 return children
}