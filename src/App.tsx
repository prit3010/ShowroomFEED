// import Showroom from './components/showroom';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider,useQuery,useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import Showroom from './components/showroom';



const SHOWROOM_QUERY = gql`
query GetShowrooms {
  getShowrooms {
    id
    title
    boards
    board {
      id
      title
      description
      image
    }
  }
}
`;
interface ShowroomProps {
  title: string;
  boards: Board[];
}

interface Board {
  id: string;
  title: string;
  description: string;
  image: string;
}

function App() {
  const { loading, error, data } = useQuery(SHOWROOM_QUERY);
  const myshowroom = data?.getShowrooms || [];
  var showrooms = [];
  for (var a of myshowroom) {
    const res = showrooms.findIndex((item) => item.title === a.title);
    if (res === -1) {
      var thisshowroom: ShowroomProps = {
        title: a.title,
        boards: [a.board]
      }
      showrooms.push(thisshowroom);
    } else {
      showrooms[res].boards.push(a.board);
    }
  }
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  return (
    <div>
      <Showroom showrooms = {showrooms}/>
    </div>
  );
}

export default App;
