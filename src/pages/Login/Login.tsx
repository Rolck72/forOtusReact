import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Headling from '../../components/Headling/Headling'
import Input from '../../components/input/input'
import styles from './Login.module.css'
import { FormEvent, useState} from 'react'
import { PREFIX } from '../../API/API'


// Интерфейс для формы входа
export type LoginForm = {
  email: {
    value: string
  }
  password: {
    value: string
  }
}

export function Login() {
  // Состояние для отображения сообщения об ошибке
	const [error, setError] = useState< string | null>()

 // Функция отправки данных для входа
 const sendLogin = async (email: string, password: string) => {
  try {
    const response = await fetch(`${PREFIX}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    console.log('Response:', response);

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status} - ${response.statusText || 'Unknown'}`);
    }

    const responseData = await response.json();

    console.log('Response Data:', responseData);

    if (responseData.token) {
      return responseData.token;
    } else {
      throw new Error('Произошла ошибка: токен не был получен в ответе сервера.');
    }
  } catch (error) {
    console.error('Произошла ошибка:', error);
    throw error;
  }
};


const submit = async (e: FormEvent) => {
  e.preventDefault();
  setError(null);

  try {
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    const response = await sendLogin(email.value, password.value);

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status} - ${response.statusText}`);
    }

		const responseData = await response.json();
    // Обрабатываем успешный ответ
   // Убедитесь, что свойство `token` определено в ответе
	 if (responseData.token) {
		return responseData.token;
	} else {
		throw new Error('Произошла ошибка: токен не был получен в ответе сервера.');
	}
} catch (error) {
	console.error('Произошла ошибка:', error);
	throw error; // Передаем ошибку дальше для обработки
}
};

 

  return (
    <div className={styles['login']} onSubmit={submit}>
      <Headling>Вход</Headling>
		{ error && <div className={styles['error']}>{error}</div>}
      <form className={styles['form']}>
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
      </form>
      <div className={styles['links']}>
        <div>Нет акканута?</div>
        <Link to='/auth/register'>Зарегистрироваться</Link>
      </div>
    </div>
  )
}



