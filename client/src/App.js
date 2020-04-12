import React from 'react';
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo"



// Apollo client setup
const client = new ApolloClient({
  uri : 'http://localhost:4000/graphql'
})



function App(props) {
  return (
    <ApolloProvider client = {client}>
    <div id="main">
      <h1>Reading List</h1>
      <BookList />
      <AddBook />
    </div>
    </ApolloProvider>
  );
}

export default App;
