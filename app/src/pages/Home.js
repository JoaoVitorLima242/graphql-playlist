import { Col, Row} from 'reactstrap'

import BookList from "../components/BookList";
import AuthorList from '../components/AuthorList';


const Home = () => {
    return (
        <div className="container">
        <h1>GraphQL Book Playlist</h1>
        <Row className='mt-4'>
          <Col>
            <BookList />
          </Col>
          <Col>
            <AuthorList />
          </Col>
        </Row>
      </div>
    )
}

export default Home