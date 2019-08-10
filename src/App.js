import React from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import SearchBooks from './SearchBook';
import ShowAll from './ShowAll';
import * as BooksAPI from './BooksAPI'
import ShowOne from './ShowOne';

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
  // getOne(bookId) {
  //   BooksAPI.get(bookId).then((book)=> {
  //     console.log(book, "yo book found");
  //     this.setState({book})
  //   })
  // }
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
              // onSearchById = {(bookId)=>{
              //   this.getOne(bookId)
              // }}
              books={this.state.searchedBooks}
            />
          )}
        />
        <Route path = '/book' render = {()=> (
          <ShowOne book = {this.state.book}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
