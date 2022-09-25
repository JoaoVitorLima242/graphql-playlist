import React from "react";
import { useSearchParams, Link } from 'react-router-dom';
import {gql, useQuery} from '@apollo/client'


const BOOK_BY_ID = gql`
  query Book($id: ID) {
    book(id: $id) {
      name
      genre
      author {
        id
        name
      }
    }
  }
`

const Author = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id')

    const { loading, error, data } = useQuery(BOOK_BY_ID, {
        variables: {id}
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    const {
        name,
        genre,
        author
    } = data.book || {}

    return(
        <div className="m-4">
            <h1>{name}</h1>
            <h2>{genre}</h2>
            <h2><Link to={'/author?id='+author.id}>{author.name}</Link></h2>
               
        </div>
    )
}

export default Author