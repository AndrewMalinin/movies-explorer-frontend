import React from 'react'
import FormInput from '../common/FormInput';

import { ReactComponent as Logo} from '../../images/icons/logo.svg';

import './register.scss'
import { useState } from 'react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="register">
      <header className="register__header">
        <Logo className="register__logo"/>
        <h1 className="register__title">Добро пожаловать!</h1>
      </header>
      <main className="register__content">
      <form action="#" className="auth-form">
      <div className="auth-form__inputs">
          <div className="auth-form__input-container">
            <FormInput
              type="text" 
              caption="Имя" 
              onChange={(e)=>{setName(e.target.value)}} 
              direction='vertical' 
              value={name}
            />
            <span className="auth-form__validation-message"></span>
          </div>
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
          <div className="auth-form__input-container">
            <FormInput
              type="password" 
              caption="Пароль" 
              onChange={(e)=>{setPassword(e.target.value)}} 
              direction='vertical' 
              value={password}
            />
            <span className="auth-form__validation-message"></span>
          </div>
        </div>
          <button type="submit" className="button auth-form__submit-button">Зарегистрироваться</button>
        </form>
        <div className="register__tip">Уже зарегистрированы? <a className='register__link' href='/signin'>Войти</a></div>
      </main>
    </div>
  )
}
