import './App.css';
import { useNavigate  } from 'react-router-dom';
import graph1Img from './images/graph1.png';
import graph2Img from './images/graph2.png';
import graph3Img from './images/graph3.png';
import graph4Img from './images/graph4.png';

function Graphs() {
    localStorage.removeItem('SelectedGraph');
    localStorage.removeItem('GeneratedGraph');
    const navigate  = useNavigate();

    const handleBack = () => {
        navigate('/');
    };

    const handle1 = () => {
        localStorage.setItem('SelectedGraph', '1');
        navigate('/parameters');
    };
    
    const handle2 = () => {
        localStorage.setItem('SelectedGraph', '2');
        navigate('/parameters');
    };

    const handle3 = () => {
        localStorage.setItem('SelectedGraph', '3');
        navigate('/parameters');
    };

    const handle4 = () => {
        localStorage.setItem('SelectedGraph', '4');
        navigate('/parameters');
    };

    return (
        <div className="container">
            <button type="button" className="back-button" onClick={handleBack}>Back</button>
            <h1>Select Graph Type</h1>
            <div className="button-grid">
                <div className="graph-container">
                    <h2>Fossil Energy Consumption by Country</h2>
                    <img src={graph1Img} alt="Graph 1" className="button-image" />
                    <button type="button" className="graph-button" onClick={handle1}>Graph 1</button>
                </div>
                <div className="graph-container">
                    <h2>Sustainable Energy Consumption by Country</h2>
                    <img src={graph2Img} alt="Graph 2" className="button-image" />
                    <button type="button" className="graph-button" onClick={handle2}>Graph 2</button>
                </div>
                <div className="graph-container">
                    <h2>Stats over a 10 Year Period</h2>
                    <img src={graph3Img} alt="Graph 3" className="button-image" />
                    <button type="button" className="graph-button" onClick={handle3}>Graph 3</button>
                </div>
                <div className="graph-container">
                    <h2>Energy Supply & Demand by Country</h2>
                    <img src={graph4Img} alt="Graph 4" className="button-image" />
                    <button type="button" className="graph-button" onClick={handle4}>Graph 4</button>
                </div>
            </div>
        </div>
    );
}

export default Graphs;
