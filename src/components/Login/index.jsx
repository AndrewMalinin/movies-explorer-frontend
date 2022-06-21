import React, { useState } from 'react'
import FormInput from '../common/FormInput';

import { ReactComponent as Logo} from '../../images/icons/logo.svg';

import './login.scss'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login">
      <header className="login__header">
        <Logo className="login__logo"/>
        <h1 className="login__title">Добро пожаловать!</h1>
      </header>
      <main className="login__content">
        <form action="#" className="auth-form">
          <div className="auth-form__inputs">
            <div className="auth-form__input-container">
              <FormInput
                type="email" 
                caption="E-mail" 
                onChange={(e)=>{setEmail(e.target.value)}} 
                direction='vertical' 
                value={email}
              />
              <span className="auth-form__validation-message"></span>
            </div>
            <div className="auth-form__input-container auth-form__input-container_no-valid">
              <FormInput
                type="password" 
                caption="Пароль" 
                onChange={(e)=>{setPassword(e.target.value)}} 
                direction='vertical' 
                value={password}
              />
              <span className="auth-form__validation-message">Что-то пошло не так...</span>
            </div>
          </div>
          <button type="submit" className="button auth-form__submit-button">Войти</button>
        </form>
        <div className="login__tip">Ещё не зарегистрированы? <a className='login__link' href='/signup'>Регистрация</a></div>
      </main>
    </div>
  )
}
