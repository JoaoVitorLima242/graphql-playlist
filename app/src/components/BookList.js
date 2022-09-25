import {Card} from 'reactstrap'

// const getBooksQuery = gql`
//     {
//         books {
//             id
//             name
//         }
//     }
// `


const BookList = (props) => {
    console.log(props)
    return (
        <Card className='p-4'>
            <h2>Books</h2>
            <ul>
                <li>Book name</li>
            </ul>
        </Card>
    )
}

export default BookList