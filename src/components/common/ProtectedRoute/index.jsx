import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  return (props.isLogged ? props.children : <Navigate to={"/login"} />);
}
