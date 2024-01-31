// Login.tsx

import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/input/input';
import styles from './Login.module.css';
import { FormEvent, useState } from 'react';
import { PREFIX } from '../../API/API';
import { LoginResponse } from '../../interface/auth.interface';
import axios, { AxiosError } from 'axios';


// Интерфейс для формы входа
export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export function Login() {
  // Состояние для отображения сообщения об ошибке
  const [error, setError] = useState<string | null>();
	// перенаправляем пользователя
	const navigate = useNavigate()


 const submit = async (e: FormEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & LoginForm
		const {email, password} = target
	  await sendLogin(email.value, password.value)
 }

  // Функция отправки данных для входа
  const sendLogin = async (email: string, password: string) => {
		try{
			const { data } = await axios.post<LoginResponse>(`${PREFIX}/signin`, 
      { 
				email,
				password
			})
			  console.log(data)
				localStorage.setItem('jwt', data.access_token )
				
				// после авторизации направляем пользователя на главную 
				navigate('/')
			}catch(e){
		    if (e instanceof AxiosError){
					setError(e.response?.data.message)
				}
    }
	}
 


  return (
		<form className={styles['login']} onSubmit={submit}>
		<Headling>Вход</Headling>
		{error && <div className={styles['error']}>{error}</div>}
		<div className={styles['form']}>
			<div className={styles['field']}>
				<label htmlFor='email'>Ваш email</label>
				<Input id='email' name='email' placeholder='Email' />
			</div>
			<div className={styles['field']}>
				<label htmlFor='password'>Ваш пароль</label>
				<Input
					id='password'
					name='password'
					type='password'
					placeholder='Пароль'
				/>
			</div>
			<Button apperence='big'>Вход</Button>
		</div>
		<div className={styles['links']}>
			<div>Нет аккаунта?</div>
			<Link to='/auth/register'>Зарегистрироваться</Link>
		</div>
	</form>
  );
}
