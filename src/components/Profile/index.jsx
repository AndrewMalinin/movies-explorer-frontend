import React, { useMemo } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { useFormWithValidation, useMessagePopup } from '../../utils/hooks'
import { api } from '../../utils/MainApi'
import { namePattern } from '../../utils/patterns'
import FormInput from '../common/FormInput'
import Header from '../common/Header'
import MessagePopup from '../common/MessagePopup'

import './profile.scss'

// interface IProfileProps {
//   onLogout():void
// }

export default function Profile(props/*:IProfileProps*/) {
  const [context, setContext] = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid} = useFormWithValidation({name: context.name, email: context.email});
  const isEdited = useMemo(()=> values.name !== context.name || values.email !== context.email,[values, context]);
  const [waitingResponse, setWaitingResponse] = useState(false);
  const {popupControlObject, openMessagePopup} = useMessagePopup();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSaveProfile();
  }

  const handleSaveProfile = () => {
    setWaitingResponse(true);
    api.sendEditProfileRequest(values)
    .then((userInfo)=>{
      setContext(userInfo);
      openMessagePopup('success', 'Данные профиля успешно изменены!');
    })
    .catch((err)=>{
      if (err.statusCode === 409) {
        openMessagePopup('error', 'Данный E-mail уже используется.');
      }
      else {
        openMessagePopup('error', err.message);
      }
    })
    .finally(()=>{
      setWaitingResponse(false)
    })
  }

  return (
    <>
      <Header/>
      <main className='profile'>
        <form action="#" className="profile__form" onSubmit={handleFormSubmit}>
          <h1 className='profile__form-title'>{`Привет, ${context.name}!`}</h1>
          <div className="auth-form__input-container">
            <FormInput
              type="text"
              caption="Имя"
              onChange={handleChange}
              direction='horizontal'
              name="name"
              value={values.name}
              pattern={namePattern}
              required
            />
            <span className="auth-form__validation-message">{errors.name && "Имя должно быть длиной от 2 до 30 символов и содержать только латиницу, кириллицу, пробел или дефис"}</span>
          </div>
          <div className="auth-form__input-container">
            <FormInput
              type="email"
              caption="E-mail"
              onChange={handleChange}
              direction='horizontal'
              name="email"
              value={values.email}
              required
            />
            <span className="auth-form__validation-message">{errors.email}</span>
          </div>
        </form>
        <div className="profile__buttons">
          <button className="button profile__button" onClick={handleSaveProfile} disabled={!isEdited || !isValid}>{waitingResponse ? 'Сохранение...':'Сохранить'}</button>
          <button className="button profile__button profile__button_style_warning" onClick={props.onLogout}>Выйти из аккаунта</button>
        </div>
      </main>
      <MessagePopup popupControlObject={popupControlObject}/>
    </>
  )
}
