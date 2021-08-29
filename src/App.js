import { useState, useEffect } from 'react';
import Loading from './Loading';
import './index.css';
import Tours from './Tours';

const url = 'http://localhost:8000/tours';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [tours, setTours] = useState([]);

  const removeTour = id => {
    const newTours = tours.filter(tour => tour.id !== id);
    setTours(newTours);
  }

  const fetchTours = async() => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setIsLoading(false);
      setTours(tours);
      console.log(tours);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }  
  } 

  useEffect(() => {
    fetchTours();
  }, [])

  return (
      <main>
        {isLoading && <Loading />}
        <Tours tours={tours} removeTour={ removeTour } />
      </main>
  );
}

export default App;
