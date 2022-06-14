import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../common/ProtectedRoute'
import Login from '../Login'
import Main from '../Main'
import Movies from '../Movies'
import Profile from '../Profile'
import Register from '../Register'
import SavedMovies from '../SavedMovies'

export default function App() {
    const [isLogged, setIsLogged] = useState(true);

    return (
        <Routes>
            <Route path="*" element={
                <ProtectedRoute isLogged={isLogged}>
                    <Main/>
                </ProtectedRoute>
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
                <Register/>
            }/>

            <Route path="/signin" element={
                <Login/>
            }/>

    </Routes>
    )
}
