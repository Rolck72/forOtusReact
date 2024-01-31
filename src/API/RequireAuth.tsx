import { ReactNode } from 'react'
import { Navigate } from 'react-router'

export const RequireAuth = ( {children}:{children: ReactNode} ) =>{
	 const jwt = null

	 if (!jwt){
		return <Navigate to="/auth/signin" replace/>
	 }
	 return children
}