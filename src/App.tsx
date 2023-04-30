import Showroom from './components/showroom';
import './App.css';

function App() {
    const data = {
    title: 'my showroom',
    boards: [
      {
        title: 'board one',
        id: '1',
        image: 'https://ibb.co/CPJ55SJ',
      },
      {
        title: 'board two',
        id: '2',
        image: 'https://some-image-url.com/board-two.jpg',
      },
      {
        title: 'board three',
        id: '3',
        image: 'https://some-image-url.com/board-three.jpg',
      },
    ],
  };
  return <Showroom title={data.title} boards={data.boards} />;
}

export default App;
