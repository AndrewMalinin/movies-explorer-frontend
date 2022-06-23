import React from 'react'
import { useState } from 'react'
import FormInput from '../common/FormInput'
import Header from '../common/Header'

import './profile.scss'

export default function Profile() {
  const [isEditing, setEditingState] = useState(false);
  const [name, setName] = useState('Виталий');
  const [email, setEmail] = useState('test@mail.ru');
  return (
    <>
      <Header/>
      <main className='profile'>
        <form action="#" className="profile__form">
          <h1 className='profile__form-title'>{`Привет, ${name}!`}</h1>
          <FormInput 
            type="text" 
            caption="Имя" 
            onChange={(e)=>{setName(e.target.value)}} 
            direction='horizontal' 
            value={name}
          />
          <FormInput 
            type="email" 
            caption="E-mail" 
            onChange={(e)=>{setEmail(e.target.value)}} 
            direction='horizontal' 
            value={email}
          />
        </form>
        <div className="profile__buttons">
          <button className="button profile__button" onClick={()=>{setEditingState(!isEditing)}}>{isEditing ? 'Сохранить':'Редактировать'}</button>
          <button className="button profile__button profile__button_style_warning">Выйти из аккаунта</button>
        </div>
      </main>
    </>
  )
}
