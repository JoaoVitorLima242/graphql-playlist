import {Card, Button, Row, Col, Form, Alert} from 'reactstrap'
import { useQuery, gql, useMutation } from '@apollo/client';
import {Link} from 'react-router-dom'
import {useForm } from 'react-hook-form'

// Define mutation
const ADD_BOOK = gql`
  mutation AddBook($name: String!, $genre: String!, $author: ID!,) {
    addBook(name: $name, genre: $genre, author: $author) {
        id
        name
    }
  }
`;


const GET_AUTHORS = gql`
    {
        authors {
            id
            name
        }
    }
`

const AddBook = () => {
    const {register, handleSubmit} = useForm()
    
    const { loading, error, data } = useQuery(GET_AUTHORS);
    const [addTodo, { data: dataMutation, loading: loadMutation, error: errorMutation }] = useMutation(ADD_BOOK);
    
    const onSubmit = (data) =>{ 
        const {
            name,
            genre,
            author
        } = data
        
        addTodo({
            variables: {
                name,
                genre,
                author
            }
        })
    }
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    return (
        <div className="container">
            <Row>

                <Col md='2'></Col>
                <Col>
                    <Card className='m-3'>
                        <Form className='p-3' onSubmit={handleSubmit(onSubmit)}>
                            <h3 className='text-center'>BOOK</h3>
                            <Row>
                                <Col>
                                    <input 
                                        placeholder="name"
                                        className='form-control'
                                        {...register('name')}
                                    />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>
                                    <input 
                                        placeholder="genre"
                                        className='form-control'
                                        {...register('genre')}
                                    />
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>
                                    <select 
                                        placeholder="author"
                                        type="select"
                                        className='form-select'
                                        {...register('author')}
                                    >
                                        {data.authors && data.authors.length > 0 && data.authors.map(({id, name}) => (
                                            <option value={id} key={id}>{name}</option>
                                        ))}
                                    </select>
                                </Col>
                            </Row>
                            {
                                errorMutation &&
                                <Alert color='danger' className='mt-2'>
                                    {errorMutation.message}
                                </Alert>

                            }
                            {
                                dataMutation &&
                                <Alert color='success' className='mt-2'>
                                    <p className='text-center'>Book <Link to={'/book?id='+dataMutation.addBook.id}>{dataMutation.addBook.name}</Link> added!</p>
                                </Alert>

                            }
                            <Button className='mt-3'>SUBMIT</Button>
                        </Form>
                    </Card>
                </Col>
                <Col md='2'></Col>
            </Row>
        </div>
    )
}

export default AddBook