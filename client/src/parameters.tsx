import { useEffect, useState } from 'react';
import CountryDropdown from './countrydropdown'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Parameters() {
    const [selectedGraph, setSelectedGraph] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('SelectedGraph');
        if (!token) {
          window.location.href = '/graphs';  
        } else {
            setSelectedGraph(token);
        }
      }, []);

      const displayedParameters = () => {
        switch (selectedGraph) {
            case '1':
                return <div>
                            <label htmlFor="countryDropdown">Select a country:</label>
                            <CountryDropdown id="countryDropdown" onSelectCountry={setSelectedCountry} />
                        </div>
            case '2':
                return <div>You chose graph 2</div>
            case '3':
                return <div>You chose graph 3</div>
            case '4':
                return <div>You chose graph 4</div>
        }
    }

    const handleBack = () => {
        window.location.href = '/graphs'
    }

    const handleGenerate = async () => {
        if (selectedGraph === '1') {
            if (selectedCountry) {
                try {
                    const url = new URL('http://localhost:5000/firstGraph', window.location.origin);
                    url.searchParams.append('country', selectedCountry);
                    url.searchParams.append('graphType', selectedGraph);
    
                    const response = await fetch(url.toString(), {
                        method: 'GET',
                    });
    
                    if (response.ok) {
                        const imageBlob = await response.blob();
                        const imageUrl = URL.createObjectURL(imageBlob);
                        localStorage.setItem('GeneratedGraph', imageUrl);
                        window.location.href = '/YourGraph';
                    } else {
                        console.error('Failed to generate graph:', response.statusText);
                        toast.error('Failed to generate graph.')
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                toast.error("Select a country.")
            }
        } else {
            window.location.href = '/YourGraph';
        }
    };


  return (
    <div>
        <button type="button" onClick={handleBack}>Back</button>
        <ToastContainer />
        <h1>Parameters</h1>
        {displayedParameters()}
        <button type="button" onClick={handleGenerate}>Generate Graph</button>
    </div>
  )
}

export default Parameters