import { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function YourGraph() {
    const navigate  = useNavigate();
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const storedImageUrl = localStorage.getItem('GeneratedGraph');
        if (storedImageUrl) {
            setImageUrl(storedImageUrl);
        } else {
            console.error('No generated graph image found.');
        }
    }, []);

    const handleBack = () => {
        navigate('/');
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.style.display = 'none';
            document.body.appendChild(a);

            a.href = url;
            a.download = 'your-graph.png';
            a.click();

            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };
  
  

    return (
        <div>
            <button type="button" onClick={handleBack} className="back-button">Home</button>
            <h1>Your Graph</h1>
            {imageUrl && <img src={imageUrl} alt="Generated Graph" />}
            <p>Source:</p>
            {imageUrl && <button type="button" onClick={handleDownload}>Download Graph</button>}
        </div>
    );
}

export default YourGraph;
