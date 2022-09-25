const graphql = require('graphql')
const _ = require('lodash')

const BookModel = require('../models/book')
const AuthorModel = require('../models/author')

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID, 
    GraphQLInt,
    GraphQLList
} = graphql



const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {type: GraphQLString}
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                // return _.filter(books, {authorId: parent.id})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        books: {
            type: GraphQLList(BookType),
            resolve() {
                // return books
            }
        },
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                // return _.find(books, {id: args.id}) 
            }
        },
        authors: {
            type: GraphQLList(AuthorType),
            resolve() {
                // return authors
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID } 
            },
            resolve(parent, args) {
                // return _.find(authors, {id: args.id})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
            },
            resolve(parent, args) {
                const {
                    name,
                    age
                } = args

                let author = new AuthorModel({
                    name,
                    age
                });

                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                author: {type: GraphQLID}
            },
            resolve(parent, args) {
                const {
                    name,
                    genre,
                    author
                } = args

                let book = new BookModel({
                    name,
                    genre,
                    author
                });

                return book.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})