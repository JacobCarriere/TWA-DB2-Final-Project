import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

function YourGraph() {
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
        window.location.href = '/parameters';
    };

    const handleDownload = () => {
      const downloadLink = document.createElement('a');
      downloadLink.href = imageUrl;
      downloadLink.download = 'your-graph.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
  };
  
  

    return (
        <div>
            <button type="button" onClick={handleBack}>Back</button>
            <h1>Your Graph</h1>
            {imageUrl && <img src={imageUrl} alt="Generated Graph" />}
            {imageUrl && <button type="button" onClick={handleDownload}>Download Graph</button>}
        </div>
    );
}

export default YourGraph;
