import BookList from "./components/BookList";
import { Col, Row} from 'reactstrap'

function App() {
  return (
    <div className="container">
      <h1>GraphQL Book Playlist</h1>
      <Row>
        <Col>
          <BookList />
        </Col>
      </Row>
    </div>
  );
}

export default App;
