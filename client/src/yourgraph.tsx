import { useEffect, useState } from 'react';

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

    return (
        <div>
            <button type="button" onClick={handleBack}>Back</button>
            <h1>Your Graph</h1>
            {imageUrl && <img src={imageUrl} alt="Generated Graph" />}
        </div>
    );
}

export default YourGraph;
