import { useEffect, useState } from 'react';
import CountryDropdown from './countrydropdown'

function Parameters() {
    const [selectedGraph, setSelectedGraph] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('SelectedGraph');
        if (!token) {
          window.location.href = '/graphs';  
        } else {
            setSelectedGraph(token);
        }
      }, []);

    const handleBack = () => {
        window.location.href = '/graphs'
    }

    const handleGenerate = () => {
        window.location.href = '/YourGraph'
    }

    const displayedParameters = () => {
        switch (selectedGraph) {
            case 'Graph1':
                return <div>
                            <label htmlFor="countryDropdown">Select a country:</label>
                            <CountryDropdown id="countryDropdown" />
                        </div>
            case 'Graph2':
                return <div>You chose graph 2</div>
            case 'Graph3':
                return <div>You chose graph 3</div>
            case 'Graph4':
                return <div>You chose graph 4</div>
        }
    }

  return (
    <div>
        <button type="button" onClick={handleBack}>Back</button>
        <h1>Parameters</h1>
        {displayedParameters()}
        <button type="button" onClick={handleGenerate}>Generate Graph</button>
    </div>
  )
}

export default Parameters