import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import * as modules from '../../modules/'

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'  component={modules.AppContainer}/>
        <Route path='/about'  component={modules.AboutContainer}/>
        <Route path='/chatbot'  component={modules.ChatbotContainer}/>
      </Switch>
    </BrowserRouter>
  )
 }