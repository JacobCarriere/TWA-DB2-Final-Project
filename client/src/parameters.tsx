import { useEffect, useState } from 'react';
import {CountryDropdown, YearDropdown} from './dropdowns'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Parameters() {
    const [selectedGraph, setSelectedGraph] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCountry2, setSelectedCountry2] = useState('');
    const [selectedCountry3, setSelectedCountry3] = useState('');
    const [selectedCountry4, setSelectedCountry4] = useState('');
    const [selectedYear, setSelectedYear] = useState(2022);

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
                return <div>
                            <div><label htmlFor="countryDropdown">Select a country:</label>
                            <CountryDropdown id="countryDropdown" onSelectCountry={setSelectedCountry} /></div>
                            <div><label htmlFor="countryDropdown">Select a second country (Optional):</label>
                            <CountryDropdown id="countryDropdown" onSelectCountry={setSelectedCountry2} /></div>
                            <div><label htmlFor="countryDropdown">Select a third country (Optional):</label>
                            <CountryDropdown id="countryDropdown" onSelectCountry={setSelectedCountry3} /></div>
                            <div><label htmlFor="countryDropdown">Select a fourth country (Optional):</label>
                            <CountryDropdown id="countryDropdown" onSelectCountry={setSelectedCountry4} /></div>
                            <div><label htmlFor="countryDropdown">Select a year:</label>
                            <YearDropdown id="yearDropDown" onSelectYear={setSelectedYear} /></div>
                        </div>
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
                        toast.success("Generating graph...");
                        const imageUrl = 'http://localhost:5000/image/fossilconsumption.png';
                        localStorage.setItem('GeneratedGraph', imageUrl);
                        window.location.href = '/YourGraph';
                    } else {
                        console.error('Failed to generate graph:', response.statusText);
                        toast.error('Failed to generate graph.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                toast.error("Select a country.");
            }
        } else if (selectedGraph === '2') {
            if (selectedCountry) {
                if (selectedYear) {
                    try {
                        const url = new URL('http://localhost:5000/pieChart', window.location.origin);
                        url.searchParams.append('year', selectedYear.toString());
                        url.searchParams.append('country', selectedCountry);
                        url.searchParams.append('country', selectedCountry2);
                        url.searchParams.append('country', selectedCountry3);
                        url.searchParams.append('country', selectedCountry4);
                        url.searchParams.append('graphType', selectedGraph);
        
                        const response = await fetch(url.toString(), {
                            method: 'GET',
                        });
        
                        if (response.ok) {
                            toast.success("Generating graph...");
                            const imageUrl = 'http://localhost:5000/image/sustainconsumption.png';
                            localStorage.setItem('GeneratedGraph', imageUrl);
                            window.location.href = '/YourGraph';
                        } else {
                            console.error('Failed to generate graph:', response.statusText);
                            toast.error('Failed to generate graph.');
                        }
                    } catch (error) {
                        console.error('Error:', error);
                    }
                } else {
                    toast.error("Select a year.")
                }
            } else {
                toast.error("Select a country.");
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