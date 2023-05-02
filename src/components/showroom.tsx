import React from 'react';
import './showroom.css';
import ReactDOM from 'react-dom';
import { useQuery,useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
interface Board {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface BoardActivity {
  id: string;
  timestamp: string;
  eventType: string;
}

interface ShowroomProps {
  title: string;
  boards: Board[];
}

type Props = {
  showrooms: ShowroomProps[];
};


const LOG_USER_ACTIVITY = gql`
mutation CreateUserActivity($data: UserActivityInput!) {
  createUserActivity(data: $data) {
    id
    timestamp
    eventType
    page
    board_id
    board {
      id
      title
      description
      image
    }
  }
}
`

function Showroom({showrooms} : Props) {
  const [clickHoverCount, setClickHoverCount] = React.useState(0);
  const [clickedHoveredImages, setClickedHoveredImages] = React.useState<BoardActivity[]>([]);
  const [createUserActivity] = useMutation(LOG_USER_ACTIVITY, {
    onError: (error) => {
      console.log('Failed to add user activity:', error);
    },
  });

  const handleHoverImageClick = (board: Board, type: string) => {
    console.log("Clicked on board: " + board.title + " with type: " + type)
    setClickHoverCount(clickHoverCount + 1);
    var newBoardActivity: BoardActivity = {
      id: board.id,
      timestamp: new Date().toISOString(),
      eventType: type,
    };
    setClickedHoveredImages([...clickedHoveredImages, newBoardActivity]);
    if (clickHoverCount === 10){
      clickedHoveredImages.forEach(async (board) => {
        await createUserActivity({
          variables: {
            data: {
              eventType: board.eventType,
              page: 'showroom',
              board_id: board.id,
              timestamp: board.timestamp,
            },
          },
        }).catch((error) => {
          console.log(`Error creating user activity: ${error}`);
        });
      });
    setClickHoverCount(0)
    setClickedHoveredImages([])
    console.log("Updated UserActivity MongoDB")
    };
  };


    return (
   <div className="showroom-container">
    <div className="sidebar">
        <ul>
        <h2>Showrooms</h2>
          {showrooms.map((showroom) => (
            <li key={showroom.title}>
              <a href={`#${showroom.title}`}>{showroom.title}</a>
            </li>
          ))}
        </ul>
      </div>
    <ul>
      {showrooms.map((showroom) => (
        <ul>
         <div key = {showroom.title} style={{ width: 1000, margin: 10 }}>
          <h2>{showroom.title}</h2>
          {showroom.boards.map(board => (
          <div key={board.id} style={{ width: 1000, margin: 10 }}>
            <h3 className = "boardTitle">{board.title}</h3>
            <p>{board.description}</p>
            <img src={board.image} alt={board.title} style={{ width: '100%' }} onClick={()=> handleHoverImageClick(board,"click")}  onMouseLeave={() => handleHoverImageClick(board,"hover")}/>
          </div>
        ))}
        </div>
        </ul>
      ))}
    </ul>
    </div>
  ) ;
}

export default Showroom;