import { useEffect, useState } from 'react';
import {CountryDropdown, YearDropdown, StatDropdown} from './dropdowns'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate  } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'


function Parameters() {
    localStorage.removeItem('GeneratedGraph');
    const navigate  = useNavigate();
    const [selectedGraph, setSelectedGraph] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCountry2, setSelectedCountry2] = useState('');
    const [selectedCountry3, setSelectedCountry3] = useState('');
    const [selectedCountry4, setSelectedCountry4] = useState('');
    const [selectedYear, setSelectedYear] = useState(2022);
    const [selectedStat, setSelectedStat] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('SelectedGraph');
        if (!token) {
            navigate('/Graphs');  
        } else {
            setSelectedGraph(token);
        }
      }, []);

      const displayedParameters = () => {
        switch (selectedGraph) {
            case '1':
                return <div>
                            <CountryDropdown id="countryDropdown" onSelectCountry={setSelectedCountry} />
                        </div>
            case '2':
                return <div>
                            <div><CountryDropdown id="countryDropdown" onSelectCountry={setSelectedCountry} /></div>
                            <div><CountryDropdown id="countryDropdown" onSelectCountry={setSelectedCountry2} /></div>
                            <div><CountryDropdown id="countryDropdown" onSelectCountry={setSelectedCountry3} /></div>
                            <div><CountryDropdown id="countryDropdown" onSelectCountry={setSelectedCountry4} /></div>
                            <div><YearDropdown id="yearDropDown" onSelectYear={setSelectedYear} /></div>
                        </div>
            case '3':
                return <div>
                <div><YearDropdown id="yearDropDown" onSelectYear={setSelectedYear} /></div>
                <div><StatDropdown id="statDropdown" onSelectStat={setSelectedStat} /></div>
            </div>
            case '4':
                return <div>
                <div><CountryDropdown id="countryDropdown" onSelectCountry={setSelectedCountry} /></div>
                <div><YearDropdown id="yearDropDown" onSelectYear={setSelectedYear} /></div>
            </div>
        }
    }

    const handleBack = () => {
        navigate('/graphs');
    }

    const handleGenerate = async () => {
        if (selectedGraph === '1') {
            if (selectedCountry) {
                try {
                    const url = new URL('http://localhost:5000/firstGraph', window.location.origin); // this needs to be changed for deployment.
                    url.searchParams.append('country', selectedCountry);
                    url.searchParams.append('graphType', selectedGraph);
    
                    const response = await fetch(url.toString(), {
                        method: 'GET',
                    });
    
                    if (response.ok) {
                        toast.success("Generating graph...");
                        const imageUrl = 'http://localhost:5000/image/fossilconsumption.png'; // this needs to be changed for deployment.
                        localStorage.setItem('GeneratedGraph', imageUrl);
                        navigate('/YourGraph');
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
            if (selectedCountry && selectedYear) {
                try {
                    const url = new URL('http://localhost:5000/pieChart', window.location.origin); // this needs to be changed for deployment.
                    url.searchParams.append('year', selectedYear.toString());
                    url.searchParams.append('country', selectedCountry);
                    url.searchParams.append('graphType', selectedGraph);

                    if (selectedCountry2) {
                        url.searchParams.append('country', selectedCountry2);
                    }

                    if (selectedCountry3) {
                        url.searchParams.append('country', selectedCountry3);
                    }

                    if (selectedCountry4) {
                        url.searchParams.append('country', selectedCountry4);
                    }

                    const response = await fetch(url.toString(), {
                        method: 'GET',
                    });
            
                    if (response.ok) {
                        toast.success("Generating graph...");
                        const imageUrl = 'http://localhost:5000/image/sustainconsumption.png'; // this needs to be changed for deployment. Maybe?
                        localStorage.setItem('GeneratedGraph', imageUrl);
                        navigate('/YourGraph');
                    } else {
                        console.error('Failed to generate graph:', response.statusText);
                        toast.error('Failed to generate graph.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                if (!selectedCountry) {
                    toast.error("Select a country.");
                }
                if (!selectedYear) {
                    toast.error("Select a year.");
                }
            }   
        } else if (selectedGraph === '3') {
            if (selectedYear && selectedStat) {
                try {
                    const url = new URL('http://localhost:5000/barGraph', window.location.origin); // this needs to be changed for deployment.
                    url.searchParams.append('stat', selectedStat);
                    url.searchParams.append('year', selectedYear.toString());
                    url.searchParams.append('graphType', selectedGraph);
            
                    const response = await fetch(url.toString(), {
                        method: 'GET',
                    });
            
                    if (response.ok) {
                        toast.success("Generating graph...");
                        const imageUrl = 'http://localhost:5000/image/emissionperiod.png'; // this needs to be changed for deployment. As well maybe? Ai says to use relative path instead of localhost.
                        localStorage.setItem('GeneratedGraph', imageUrl);
                        navigate('/YourGraph');
                    } else {
                        console.error('Failed to generate graph:', response.statusText);
                        toast.error('Failed to generate graph.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                if (!selectedStat) {
                    toast.error("Select a stat.");
                }
                if (!selectedYear) {
                    toast.error("Select a year.");
                }
            }   
        } else if (selectedGraph === '4') {
            if (selectedCountry && selectedYear) {
                try {
                    const url = new URL('http://localhost:5000/lastgraph', window.location.origin); // this needs to be changed for deployment.
                    url.searchParams.append('year', selectedYear.toString());
                    url.searchParams.append('country', selectedCountry);
                    url.searchParams.append('graphType', selectedGraph);

                    const response = await fetch(url.toString(), {
                        method: 'GET',
                    });
            
                    if (response.ok) {
                        toast.success("Generating graph...");
                        const imageUrl = 'http://localhost:5000/image/energydemand.png'; // this needs to be changed for deployment. Use of relative path instead of localhost.
                        localStorage.setItem('GeneratedGraph', imageUrl);
                        navigate('/YourGraph');
                    } else {
                        console.error('Failed to generate graph:', response.statusText);
                        toast.error('Failed to generate graph.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                if (!selectedCountry) {
                    toast.error("Select a country.");
                }
                if (!selectedYear) {
                    toast.error("Select a year.");
                }
            }   
        } else {
            navigate('/YourGraph');
        }
    };
    


  return (
    <div>
        <button type="button" onClick={handleBack} className="back-button">Back</button>
        <ToastContainer />
        <h1>Parameters</h1>
        {displayedParameters()}
        <button type="button" onClick={handleGenerate}>Generate Graph</button>
    </div>
  )
}

export default Parameters