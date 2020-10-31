import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import CreateFamily from  '../createFamily'
import Header from '../header'

const App = () => (
  <div>
    <Header />
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/create-family" component={CreateFamily} />
    </main>
  </div>
)

export default App
