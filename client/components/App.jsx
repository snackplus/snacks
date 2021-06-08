import React, { Component } from 'react';
import MainPage from './MainPage.jsx'
import { LoggedInProvider } from './SnackContext'


export default function App() {
  return(
    <LoggedInProvider>

      <MainPage />

    </LoggedInProvider>
  )
}