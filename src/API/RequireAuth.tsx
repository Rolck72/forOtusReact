import { ReactNode } from 'react'
// import { useSelector } from 'react-redux';
import { Navigate } from 'react-router'
// import { RootState } from '../store_redux/store'

export const RequireAuth = ( {children}:{children: ReactNode} ) =>{

	// 1. хранение данных (проблема с доступом)
  // const jwt = useSelector((s: RootState) => s.user.jwt)

   const jwt = localStorage.getItem('jwt')

	 if (!jwt){
		return <Navigate to="/signin" replace/>
	 }
	 return children
}

	