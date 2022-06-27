import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children, isLogged}) {
  console.log(isLogged)
  return (children);
  // return (isLogged ? children : <Navigate to={"/signin"} />);
}
