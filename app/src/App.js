import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import AddAuthor from './pages/AddAuthor';
import AddBook from './pages/AddBook';
import Author from './pages/Author';
import Book from './pages/Book';

import Home from './pages/Home';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: '/book',
    element: <Book />
  },
  {
    path: '/add-book',
    element: <AddBook />
  },
  {
    path: '/author',
    element: <Author />
  },
  {
    path: '/add-author',
    element: <AddAuthor />
  },
]);

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <RouterProvider router={router}/>
      </div>
    </ApolloProvider>
  );
}

export default App;
