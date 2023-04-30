import React from 'react';

interface Board {
  id: string;
  title: string;
  image: string;
}

interface ShowroomProps {
  title: string;
  boards: Board[];
}

const Showroom: React.FC<ShowroomProps> = ({ title, boards }) => {
  return (
    <div>
      <h1>{title}</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {boards.map(board => (
          <div key={board.id} style={{ width: 200, margin: 10 }}>
            <h2>{board.title}</h2>
            <img src={board.image} alt={board.title} style={{ width: '100%' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Showroom;