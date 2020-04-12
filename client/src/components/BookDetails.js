import React from 'react';
// import {gql} from "apollo-boost";
import {graphql} from "react-apollo";
import {getBookQuery} from "../queries/queries"




function BookDetails(props) {
    function displayBookDetails(){
        const {book} = props.data;
        if(book){
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p> {book.genre} </p>
                    <p> {book.author.name} </p>
                    <p> All books by the author : </p>
                    <ul className="other-books">
                    {
                        book.author.books.map((item)=>{
                            return (
                                <li key={item.id}>
                                    {item.name}
                                </li>
                            )
                        })

                    }
                    </ul>
                </div>
            )
        }else{
            return (
                <div>
                    No book selected...
                </div>
            )
        }
    }
    return (
        <div id="book-details">
        {displayBookDetails()}
        </div>
    );
}

export default graphql(getBookQuery,{
    options : (props)=> {
        return {
            variables : {
                id : props.bookID
            }
        }
    }
})(BookDetails);