    const graphql = require('graphql')
    const { 
        GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema, 
        GraphQLID, 
        GraphQLInt,
        GraphQLList
    } = graphql
    const  _ = require('lodash')

    const books = [
        {name: 'book1', id: '1', authorId: '1'},
        {name: 'book2', id: '2', authorId: '2'},
        {name: 'book3', id: '3', authorId: '3'},
        {name: 'book4', id: '2', authorId: '2'},
        {name: 'book5', id: '3', authorId: '3'},
        {name: 'book6', id: '2', authorId: '3'},
        {name: 'book7', id: '3', authorId: '1'},
    ]
    const authors = [
        {name: 'Author1',age: 22, id: '1'},
        {name: 'Author2',age: 34, id: '2'},
        {name: 'Author3',age: 39, id: '3'},
    ]

    const BookType = new GraphQLObjectType({
        name: 'Book',
        fields: () => ({
            id: {type: GraphQLID},
            name: {type: GraphQLString},
            genre: {type: GraphQLString},
            author: {
                type: AuthorType,
                resolve(parent, args) {
                    return _.find(authors, {id: parent.authorId})
                }
            }
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
                    return _.filter(books, {authorId: parent.id})
                }
            }
        })
    });

    const RootQuery = new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            book: {
                type: BookType,
                args: {
                    id: { type: GraphQLID }
                },
                resolve(parent, args) {
                    return _.find(books, {id: args.id}) 
                }
            },
            author: {
                type: AuthorType,
                args: {
                    id: { type: GraphQLID } 
                },
                resolve(parent, args) {
                    return _.find(authors, {id: args.id})
                }
            }
        }
    })

    module.exports = new GraphQLSchema({
        query: RootQuery
    })