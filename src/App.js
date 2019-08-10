import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Homepage from './Homepage';
import {Route} from 'react-router-dom'
import SearchBooks from './SearchBook';

class BooksApp extends React.Component {
  state = {

  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' component = {Homepage}/>
        <Route path='/search' component = {SearchBooks}/>
      </div>
    )
  }
}

export default BooksApp
