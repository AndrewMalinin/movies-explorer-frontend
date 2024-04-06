import React from 'react';

import './formInput.scss'

// interface FormInputProps {
//     type: 'text' | 'password' | 'email'
//     caption: string
//     onchange(e):void
//     direction: 'horizontal' | 'vertical'
//     name: string
//     pattern?: string
//     value: string
// }

export default function FormInput(props/*:FormInputProps*/) {

  const handleChange = (e) => {
    props.onChange(e);
  }

  return (
    <article className={`form-input form-input_${props.direction}`}>
        <span className="form-input__caption">{props.caption}</span>
        <input
          className="form-input__input"
          type={props.type}
          value={props.value}
          onChange={handleChange}
          name={props.name}
          required={props.required && props.required}
          pattern={props.pattern && props.pattern}
          />
    </article>
  )
}
