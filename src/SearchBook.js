import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './App.css'

class SearchBooks extends Component {
  state = {
      query: ''
  }
  
  updateQuery = (query)=>{
    this.setState({query: query.trim()})
    if(this.props.onSearchBooks)
      this.props.onSearchBooks(this.state.query)
  }
  
  render() {
    const {query} = this.state;
    const {books}= this.props;
        return (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to='/' className="close-search" >Close</Link>
                <div className="search-books-input-wrapper">
                  <input value = {query} 
                    onChange={(e)=>{
                      this.updateQuery(e.target.value)
                    }} 
                    books= {this.state.books} 
                    type="text" 
                    placeholder="Search by title or author"
                  />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {books &&
                    books.map((book)=> (
                      <li key = {book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail}` }}></div>
                            <div className="book-shelf-changer">
                              <select value = {book.shelf}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          { book.author && 
                            <div className="book-authors">
                              {book.authors[0]}
                            </div>
                          }
                        </div>
                      </li>
                    ))
                  }
                </ol>
              </div>
          </div>
        )
    }
}

export default SearchBooks