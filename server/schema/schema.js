const graphql = require("graphql");
const { GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull } = graphql;
const _ = require('lodash');
const Book  = require('../models/Book');
const Author  = require('../models/Author');




const BookType = new GraphQLObjectType({
    name : "Book",
    fields : ()=>({
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        genre : {type : GraphQLString},
        author : {
            type : AuthorType,
            resolve (parent,args){
                // console.log(parent);
                // return _.find(authors,{id: parent.authorID})
                return Author.findById(parent.authorID);
            }
        }
        
    })
})


const AuthorType = new GraphQLObjectType({
    name : "Author",
    fields : ()=>({
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        age : {type : GraphQLInt},
        books : {
            type : new GraphQLList(BookType),
            resolve(parent,args){
                // return _.filter(books,{authorID : parent.id});
                return Book.find({authorID : parent.id});
            }
        }
        
    })
})



const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        book : {
            type : BookType,
            args : {id : {type : GraphQLID}},
            resolve(parent,args){
                // Code from db /other source
                return Book.findById(args.id);
            }
        },
        author : {
            type : AuthorType,
            args : {id : {type : GraphQLID}},
            resolve (parent,args){
                // return _.find(authors, {id : args.id});
                return Author.findById(args.id);
            }
        },
        books : {
            type : new GraphQLList(BookType),
            resolve(parent,args){
                // return books;
                return Book.find({});
            }
        },
        authors : {
            type : new GraphQLList(AuthorType),
            resolve(parent,args){
                // return authors;
                return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields : {
        addAuthor : {
            type : AuthorType,
            args : {
                name : {type : new GraphQLNonNull(GraphQLString)},
                age : {type : new GraphQLNonNull(GraphQLInt)}
            },
            resolve (parent,args){
                let author = new Author({
                    name : args.name,
                    age : args.age
                });
                return author.save();
            }
        },
        addBook : {
            type : BookType,
            args : {
                name : {type : new GraphQLNonNull(GraphQLString)},
                genre : {type : new GraphQLNonNull(GraphQLString)},
                authorID : {type : new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let book = new Book({
                    name : args.name,
                    genre : args.genre,
                    authorID : args.authorID
                });
                return book.save();
            }
        }
    } 
})

module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation
})