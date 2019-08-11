import React, {Component} from 'react'

import PropTypes from 'prop-types'

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        books: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired
      };
    updateShelf = (event) => {
        console.log(this.props.book, "book", event.target.value, "value")
        this.props.changeShelf(this.props.book, event.target.value)
    }
    render() {
        let shelf = 'none';
        const {book, books} = this.props;
        for(let item of books){
            if(item.id === book.id){
                shelf = item.shelf
                break;
            }
        }
        return (
            <div className="book">
                <div className="book-top">
                {
                    book.imageLinks && book.imageLinks.thumbnail &&
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail}` }}></div>
                }
                <div className="book-shelf-changer">
                    <select onChange={this.updateShelf} defaultValue={shelf}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title" >{book.title}</div>
                { book.authors && 
                    book.authors.map((author, index)=>(
                    <div className="book-authors" key={index}>
                        {author}
                    </div>  
                    ))
                }
            </div>
        )
    }
}
export default Book