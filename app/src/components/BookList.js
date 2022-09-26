import {Card} from 'reactstrap'
import { useQuery, gql } from '@apollo/client';
import {Link} from 'react-router-dom'

const GET_BOOKS = gql`
    {
        books {
            id
            name
        }
    }
`

const BookList = ({openModal}) => {
    const { loading, error, data } = useQuery(GET_BOOKS);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;


    return (
        <Card className='p-4'>
            <div className='d-flex align-items-center justify-content-between'>
                <h2>Books</h2>
                <Link to='/add-book'>ADD</Link>
            </div>
            {data.books && data.books.length > 0 && data.books.map(({id, name}) => (
                <Link to={"/book?id="+id} key={id}>
                    <li onClick={openModal}>{name}</li>
                </Link>
            ))}
        </Card>
    )
}

export default BookList