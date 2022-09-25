import React from "react";
import { useSearchParams, Link } from 'react-router-dom';
import {gql, useQuery} from '@apollo/client'


const AUTHOR_BY_ID = gql`
  query Author($id: ID) {
    author(id: $id) {
      name
      age
      books {
        id
        name
      }
    }
  }
`

const Author = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id')

    const { loading, error, data } = useQuery(AUTHOR_BY_ID, {
        variables: {id}
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    const {
        name,
        age,
        books
    } = data.author || {}

    return(
        <div className="m-4">
            <h1>{name}</h1>
            <h2>{age}</h2>
            {books && books.length > 0 ?
                books.map(({name, id}) => (
                    <Link to={'/book?id='+id}><li key={id}>{name}</li></Link>
                ))
            :
                    <p>Dont have book</p>
            }
        </div>
    )
}

export default Author