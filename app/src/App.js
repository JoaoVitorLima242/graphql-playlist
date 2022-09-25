import { Col, Row} from 'reactstrap'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

import BookList from "./components/BookList";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query {
        authors {
          name
          books {
            name
          }
        }
      }
    `,
  })
  .then((result) => console.log(result))
  .catch(err => console.log(err.message));


// uri: 'http://localhost:4000/graphql'
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <h1>GraphQL Book Playlist</h1>
        <Row>
          <Col>
            <BookList />
          </Col>
        </Row>
      </div>
    </ApolloProvider>
  );
}

export default App;
