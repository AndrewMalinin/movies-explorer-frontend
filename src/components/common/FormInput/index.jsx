import React from 'react'

import './formInput.scss'

// interface FormInputProps {
//     type: 'text' | 'password' | 'email'
//     caption: string
//     onchange(e):void
//     direction: 'horizontal' | 'vertical'
//     value: string
// }

export default function FormInput(props/*:FormInputProps*/) {
  return (
    <article className={`form-input form-input_${props.direction}`}>
        <span className="form-input__caption">{props.caption}</span>
        <input className="form-input__input" type={props.type} value={props.value} onChange={props.onChange}/>
    </article>
  )
}
