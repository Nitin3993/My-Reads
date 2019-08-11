import React from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import SearchBooks from './SearchBook';
import ShowAll from './ShowAll';
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: [],
    book: {}
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
  changeShelf=(changedBook, shelf) => {
    BooksAPI.update(changedBook, shelf).then((updatedBook)=>{
      changedBook.shelf = shelf;
      this.setState(state=>({
        books: state.books.filter((book)=>book.id !== changedBook.id).concat(changedBook)
      }))
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
              changeShelf={this.changeShelf}
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
              searchedBooks={this.state.searchedBooks}
              books = {this.state.books}
              changeShelf={this.changeShelf}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
