import './App.css'
import { useNavigate  } from 'react-router-dom';

function Home() {
  localStorage.removeItem('SelectedGraph');
  localStorage.removeItem('GeneratedGraph');
  const navigate  = useNavigate();

  const handleEnter = () => {
    navigate('/Graphs');
  }
  
  return (
    <div>
        <div style={{ textAlign: 'center' }}>
          <h1>World Data Energy Analysis</h1>
          <h2>Generate graphs to help you visualize energy usage</h2>
          <button type="button" onClick={handleEnter}>Explore Data</button>
        </div>
    </div>
  );
}

export default Home;
