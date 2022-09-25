import {Card} from 'reactstrap'
import { useQuery, gql } from '@apollo/client';

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
            <h2>Books</h2>
            {data.books && data.books.length > 0 && data.books.map(({id, name}) => (
                <li key={id} onClick={openModal}>{name}</li>
            ))}
        </Card>
    )
}

export default BookList