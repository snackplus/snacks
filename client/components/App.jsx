import React, { Component } from 'react';
import MainContainer from './MainContainer.jsx'
import { LoggedInProvider } from './SnackContext.jsx'


export default function App() {
  return(
    <LoggedInProvider>

      <MainContainer />

    </LoggedInProvider>
  )
}