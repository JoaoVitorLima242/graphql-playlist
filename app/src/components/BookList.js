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

const BookList = (props) => {

    const { loading, error, data } = useQuery(GET_BOOKS);

    const {books} = data

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;


    return (
        <Card className='p-4'>
            <h2>Books</h2>
            {console.log(data)}
            {books && books.length > 0 && books.map(({name}) => (
                <li>{name}</li>
            ))}
        </Card>
    )
}

export default BookList