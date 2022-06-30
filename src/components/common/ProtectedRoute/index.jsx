import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children, isLogged}) {
  if (isLogged === false) {
    return <Navigate to="/" replace/>
  }
  else if (isLogged === true) {
    return children
  }
    // Во избежании переадресации во время проверки токена
  else {
    return <></>
  }
}
