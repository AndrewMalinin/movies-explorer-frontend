import React from "react";

import './messagePopup.scss'

import {ReactComponent as CloseIcon} from '../../../images/icons/cross.svg';
import {ReactComponent as ErrorIcon} from '../../../images/icons/error_m.svg';
import {ReactComponent as SuccessIcon} from '../../../images/icons/success.svg';

// interface IMessagePopupProps {
//     isOpen: boolean
//     onClose(): void
// }

export default function MessagePopup(props/*:IMessagePopupProps*/) {

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return (<SuccessIcon/>)
      case 'error':
      default:
        return (<ErrorIcon/>)
    }
  }

    return (
      <div className={`popup ${props.popupControlObject.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <button type="button" className="icon-button popup__close-button" onClick={props.popupControlObject.onClose}>
            <CloseIcon/>
          </button>
          <div className="message-block">
            <div className={`message-block__icon message-block__icon_${props.popupControlObject.type}`}>
              {getIcon(props.popupControlObject.type)}
            </div>
            <p className="message-block__description">{props.popupControlObject.message}</p>
        </div>
        </div>
      </div>
    );
}
