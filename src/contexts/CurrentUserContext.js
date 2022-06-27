import React from "react";

export const defaultUserInfo = {
  _id: '',
  name: '',
  email: ''
}

export const CurrentUserContext = React.createContext(defaultUserInfo);
