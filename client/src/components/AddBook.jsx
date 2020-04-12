import React, {useState} from 'react';
// import {gql} from "apollo-boost";
import {graphql} from "react-apollo";
import * as compose from 'lodash.flowright';


import {getAuthorsQuery, addBookMutation, getBooksQuery} from "../queries/queries";




function AddBook(props) {

    const [name,setName] = useState('');
    const [genre,setGenre] = useState('');
    const [authorID,setAuthorID] = useState('');
    


    function displayAuthors(){
        var data = props.getAuthorsQuery;
        if(data.loading){
            return (
                <option disabled>Loading Authors...</option>
            )
        }else{
            return data.authors.map((author)=>{
                return (
                    <option key={author.id} value={author.id}> {author.name} </option>
                )
            })

        }
    }
    

    function submitForm(e){
        e.preventDefault();
        props.addBookMutation({
            variables : {
                name : name,
                genre : genre,
                authorID : authorID
            },
            refetchQueries : [{query : getBooksQuery}]
        });
    }


    return (
        <form id="add-book" onSubmit = {(e)=>{submitForm(e)}}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange = {(e)=>{
                        const name = e.target.value;
                        setName(name);
                    }}/>
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange = {(e)=>{
                        const name = e.target.value;
                        setGenre(name);
                    }}/>
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange = {(e)=>{
                        const name = e.target.value;
                        setAuthorID(name);
                    }}>
                        <option>Select author</option>
                        { displayAuthors() }
                    </select>
                </div>
                <button>+</button>

            </form>
    );
}


export default compose(
    graphql(getAuthorsQuery,{name : "getAuthorsQuery"}),
    graphql(addBookMutation, {name : "addBookMutation"})
)(AddBook);