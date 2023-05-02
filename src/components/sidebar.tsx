import React from 'react';
import {Link} from 'react-router-dom';
import './sidebar.css';
interface Board {
  id: string;
  title: string;
  description: string;
  image: string;
}
interface ShowroomProps {
  title: string;
  boards: Board[];
}
type Props = {
  showrooms: ShowroomProps[];
};

const Sidebar: React.FC<Props> = ({ showrooms }) => {
  return (
    <div>
      <h3>Showrooms</h3>
      <ul>
        {showrooms.map((showroom) => (
          <li key={showroom.title}>
            <Link to={`#${showroom.title}`}>{showroom.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;