import React from 'react'
import FormInput from '../common/FormInput';

import { ReactComponent as Logo} from '../../images/icons/logo.svg';

import './register.scss'
import { useFormWithValidation, useMessagePopup } from '../../utils/hooks';
import { namePattern, passwordPattern } from '../../utils/patterns';
import Auth from '../../utils/Auth';
import { useState } from 'react';
import MessagePopup from '../common/MessagePopup';
import { Link } from 'react-router-dom';

// interface IRegisterProps {
//   onSignup():void
// }

export default function Register(props/*:IRegisterProps*/) {
  const { values, handleChange, errors, isValid} = useFormWithValidation({name: '', email: '', password: ''});
  const [waitingResponse, setWaitingResponse] = useState(false);
  const {popupControlObject, openMessagePopup} = useMessagePopup();

  const handleSubmit = (e) => {
    e.preventDefault();
    setWaitingResponse(true);
    Auth.register(values.name, values.email, values.password)
    .then(()=>{
      props.onSignup(values.email, values.password);
    })
    .catch((err/*:NetworkError*/)=>{
      openMessagePopup('error', err.message);
    })
    .finally(()=>{
      setWaitingResponse(false)
    })
  }

  return (
    <div className="register">
      <header className="register__header">
        <Logo className="register__logo"/>
        <h1 className="register__title">Добро пожаловать!</h1>
      </header>
      <main className="register__content">
        <form action="#" className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form__inputs">
            <div className={`auth-form__input-container ${errors.name ? 'auth-form__input-container_no-valid' : ''}`}>
              <FormInput
                type="text"
                caption="Имя"
                onChange={handleChange}
                direction='vertical'
                name="name"
                value={values.name}
                pattern={namePattern}
                required
              />
              <span className="auth-form__validation-message">{errors.name && "Имя должно быть длиной от 2 до 30 символов и содержать только латиницу, кириллицу, пробел или дефис"}</span>
            </div>
            <div className={`auth-form__input-container ${errors.email ? 'auth-form__input-container_no-valid' : ''}`}>
              <FormInput
                type="email"
                caption="E-mail"
                onChange={handleChange}
                direction='vertical'
                name="email"
                value={values.email}
                required
              />
              <span className="auth-form__validation-message">{errors.email}</span>
            </div>
            <div className={`auth-form__input-container ${errors.password ? 'auth-form__input-container_no-valid' : ''}`}>
              <FormInput
                type="password"
                caption="Пароль"
                onChange={handleChange}
                direction='vertical'
                name="password"
                value={values.password}
                pattern={passwordPattern}
                required
              />
              <span className="auth-form__validation-message">{errors.password && "Пароль должен быть не короче 8-ми символов"}</span>
            </div>
          </div>
          <button type="submit" className="button auth-form__submit-button" disabled={!isValid || waitingResponse}>{waitingResponse ? 'Регистрация...': 'Зарегистрироваться'}</button>
        </form>
        <div className="register__tip">Уже зарегистрированы? <Link className='register__link' to='/signin'>Войти</Link></div>
      </main>
      <MessagePopup popupControlObject={popupControlObject}/>
    </div>
  )
}
