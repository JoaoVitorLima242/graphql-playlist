import {Card, Button, Row, Col, Form, Alert} from 'reactstrap'
import { useQuery, gql, useMutation } from '@apollo/client';
import {Link} from 'react-router-dom'
import {useForm } from 'react-hook-form'

// Define mutation
const ADD_AUTHOR = gql`
  mutation AddAuthor($name: String!, $age: Int!) {
    addAuthor(name: $name, age: $age) {
        id
        name
    }
  }
`;


const AddAuthor = () => {
    const {register, handleSubmit} = useForm()
    const [addTodo, { data: dataMutation, loading: loadMutation, error: errorMutation }] = useMutation(ADD_AUTHOR);
    
    const onSubmit = (data) =>{ 
        const {
            name,
            age,
        } = data
        
        addTodo({
            variables: {
                name,
                age,
            }
        })
    }


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
                                        placeholder="age"
                                        className='form-control'
                                        {...register('age')}
                                    />
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
                                    <p className='text-center'>Book <Link to={'/author?id='+dataMutation.addAuthor.id}>{dataMutation.addAuthor.name}</Link> added!</p>
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

export default AddAuthor