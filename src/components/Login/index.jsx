import React, { useEffect, useState } from 'react'
import FormInput from '../common/FormInput';
import MessagePopup from '../common/MessagePopup';
import { useFormWithValidation, useMessagePopup } from '../../utils/hooks';
import { emailPattern, passwordPattern } from '../../utils/patterns';
import Auth from '../../utils/Auth';

import './login.scss'

import { ReactComponent as Logo} from '../../images/icons/logo.svg';
import { Link } from 'react-router-dom';

// interface ILoginProps {
//   onSignin():void
// }

export default function Login(props/*:ILoginProps*/) {
  const { values, handleChange, errors, isValid} = useFormWithValidation({email: '', password: ''});
  const [waitingResponse, setWaitingResponse] = useState(false);
  const {popupControlObject, openMessagePopup} = useMessagePopup();

  useEffect(()=>{
    if (localStorage.token) {
      props.onSignin();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    setWaitingResponse(true);
    Auth.authorize(values.email, values.password)
    .then(()=>{
      props.onSignin();
    })
    .catch((err/*:NetworkError*/)=>{
      openMessagePopup('error', err.message);
    })
    .finally(()=>{
      setWaitingResponse(false);
    })
  }

  return (
    <div className="login">
      <header className="login__header">
      <Link to="/">
        <Logo className="login__logo"/>
      </Link>
        <h1 className="login__title">Добро пожаловать!</h1>
      </header>
      <main className="login__content">
        <form action="#" className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form__inputs">
            <div className={`auth-form__input-container ${errors.email ? 'auth-form__input-container_no-valid' : ''}`}>
              <FormInput
                type="email"
                caption="E-mail"
                onChange={handleChange}
                direction='vertical'
                name="email"
                value={values.email}
                pattern={emailPattern}
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
              <span className="auth-form__validation-message">{errors.password && "Пароль не может быть короче 8-ми символов"}</span>
            </div>
          </div>
          <button type="submit" className="button auth-form__submit-button" disabled={!isValid || waitingResponse}>{waitingResponse ? 'Аутентификация...': 'Войти'}</button>
        </form>
        <div className="login__tip">Ещё не зарегистрированы? <Link className='login__link' to='/signup'>Регистрация</Link></div>
      </main>
      <MessagePopup popupControlObject={popupControlObject}/>
    </div>
  )
}
