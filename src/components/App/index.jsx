import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Auth from '../../utils/Auth'
import { api } from '../../utils/MainApi'
import ProtectedRoute from '../common/ProtectedRoute'
import { CurrentUserContext, defaultUserInfo } from '../../contexts/CurrentUserContext'
import Login from '../Login'
import Main from '../Main'
import Movies from '../Movies'
import NotFoundPage from '../NotFoundPage'
import Profile from '../Profile'
import Register from '../Register'
import SavedMovies from '../SavedMovies'

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState(defaultUserInfo);
  const navigate = useNavigate();

  useEffect(() => {
    handleAppStarted();
    console.log('стартануло')
    return(()=>{
      console.log('вышло')
    })
  }, []);

  const handleAppStarted = () => {
    tokenCheck()
    .then(()=>{
    })
    .catch(()=>{})

  }


  const tokenCheck = () => {
    return new Promise((resolve, reject)=>{
      const token = localStorage.getItem('token');
      if (token){
        api.getUserInfo()
        .then((res) => {
          if (res){
            setIsLogged(true);
            setCurrentUser(res);
            resolve();
          }
          else {
            reject();
          }
        })
        .catch(()=>{
          reject();
        })
      }
      else {
        reject();
      }
    })
  }


  const handleSignup = (email, password) => {
    Auth.authorize(email, password)
    .then(()=>{
      handleSignin();
    })
    .catch((err/*:NetworkError*/)=>{
      return Promise.reject(err)
    })
  }

  const handleSignin = () => {
    setIsLogged(true);
    navigate('/movies');
  }

  return (
    <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
      <Routes>
          <Route path="/" element={
              <Main isLogged={isLogged}/>
          }/>

          <Route path="/movies" element={
              <ProtectedRoute isLogged={isLogged}>
                  <Movies/>
              </ProtectedRoute>
          }/>

          <Route path="/saved-movies" element={
              <ProtectedRoute isLogged={isLogged}>
                  <SavedMovies/>
              </ProtectedRoute>
          }/>

          <Route path="/profile" element={
              <ProtectedRoute isLogged={isLogged}>
                  <Profile/>
              </ProtectedRoute>
          }/>


          <Route path="/signup" element={
              <Register onSignup={handleSignup}/>
          }/>

          <Route path="/signin" element={
              <Login onSignin={handleSignin}/>
          }/>

          <Route path="*" element={
              <NotFoundPage />
          }/>

      </Routes>
    </CurrentUserContext.Provider>
  )
}
