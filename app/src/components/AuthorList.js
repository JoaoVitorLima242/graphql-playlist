import {Card} from 'reactstrap'
import { useQuery, gql } from '@apollo/client';

const GET_AUTHORS = gql`
    {
        authors {
            id
            name
        }
    }
`

const AuthorList = ({openModal}) => {
    const { loading, error, data } = useQuery(GET_AUTHORS);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;


    return (
        <Card className='p-4'>
            <h2>Authors</h2>
            {data.authors && data.authors.length > 0 && data.authors.map(({id, name}) => (
                <li key={id} onClick={openModal}>{name}</li>
            ))}
        </Card>
    )
}

export default AuthorList