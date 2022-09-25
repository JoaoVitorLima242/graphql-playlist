import { Col, Row} from 'reactstrap'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

import BookList from "./components/BookList";
import AuthorList from './components/AuthorList';
import { useState } from 'react';
import DetailsModal from './components/DetailsModal';

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
  const [modal, setModal] = useState(false)

  const modalHandler = () => {
    setModal(!modal)
  }

  return (
    <ApolloProvider client={client}>
      <div className="container">
        <h1>GraphQL Book Playlist</h1>
        <Row className='mt-4'>
          <Col>
            <BookList 
              openModal={modalHandler}
            />
          </Col>
          <Col>
            <AuthorList 
              openModal={modalHandler}
            />
          </Col>
        </Row>
      </div>
      <DetailsModal 
        open={modal}
        modalHandler={modalHandler}
      />

    </ApolloProvider>
  );
}

export default App;
