import React from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import SearchBooks from './SearchBook';
import ShowAll from './ShowAll';
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books)=> {
      this.setState({books})
    })
  }
  searchBooks(query) {
    BooksAPI.search(query).then((searchedBooks)=>{
      if(searchedBooks && !searchedBooks.error)
        this.setState({searchedBooks})
    })
  }
  render() {
    return (
      <div className="app">
        <Route 
          exact path = '/' 
          render={()=> (
            <ShowAll 
              books={this.state.books}
            />
          )} 
        />
        <Route 
          path='/search' 
          render = {()=> (
            <SearchBooks 
              onSearchBooks = {(query)=>{
                this.searchBooks(query)
                }
              }
              books={this.state.searchedBooks}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
