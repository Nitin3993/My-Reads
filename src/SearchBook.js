import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Book from './Book'
import './App.css'

class SearchBooks extends Component {
  state = {
      query: '',
      // searchErr: false
  }
  
  updateQuery = (query)=>{
    this.setState({query: query.trim()})
    
  }
  sendQuery = (key)=>{
    if(key==='Enter'){
      if(this.props.onSearchBooks && this.state.query)
      {
        this.props.onSearchBooks(this.state.query)
      }
      // if(this.props.searchedBooks.length===0){
      //   this.setState({searchErr: true})
      //   console.log(this.state.searchErr)
  
      // } else {
      //   this.setState({searchErr: false})
      //   console.log(this.state.searchErr)
      // }
    }
  }

  render() {
    const {query} = this.state;
    const {books, changeShelf, searchedBooks}= this.props;
        return (
            <div className="search-books">
              <div className="search-books-bar">
              <Link className="close-search" to="/">
                Close
              </Link>
                <div className="search-books-input-wrapper">
                  <input value = {query} 
                    onChange={(e)=>{
                      this.updateQuery(e.target.value)
                    }} 
                    onKeyDown={(e)=>{
                      this.sendQuery(e.key, query)
                    }}
                    books= {this.state.books} 
                    type="text" 
                    placeholder="Search by title or author"
                  />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {searchedBooks.length>0 &&
                    searchedBooks.map((book)=> (
                      <li key = {book.id}>
                        <Book book = {book} books = {books} changeShelf={changeShelf}/>
                      </li>
                    ))
                  }
                  {/* { (this.state.searchErr) && 
                    <h3>Search did not return any books. Please try again!</h3>
                  } */}
                </ol>
              </div>
          </div>
        )
    }
}

export default SearchBooks