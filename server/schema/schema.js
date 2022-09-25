const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql
const  _ = require('lodash')

const books = [
    {name: 'book1', id: '1'},
    {name: 'book2', id: '2'},
    {name: 'book3', id: '3'},
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parent, args) {
                console.log(_.find(books, args.id) )

                return _.find(books, {id: args.id}) 
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})