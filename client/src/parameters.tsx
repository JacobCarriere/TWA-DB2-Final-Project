import { useEffect, useState } from 'react';
import { CountryDropdown, YearDropdown, StatDropdown } from './dropdowns';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function Parameters() {
    const serverUrl = import.meta.env.VITE_APP_SERVER_URL;
    var GraphUrl = ''
    localStorage.removeItem('GeneratedGraph');
    const navigate = useNavigate();
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
                return (
                    <div>
                        <CountryDropdown id="countryDropdown" onSelectCountry={setSelectedCountry} />
                    </div>
                );
            case '2':
                return (
                    <div>
                        <div><CountryDropdown id="countryDropdown" onSelectCountry={setSelectedCountry} /></div>
                        <div><CountryDropdown id="countryDropdown" onSelectCountry={setSelectedCountry2} /></div>
                        <div><CountryDropdown id="countryDropdown" onSelectCountry={setSelectedCountry3} /></div>
                        <div><CountryDropdown id="countryDropdown" onSelectCountry={setSelectedCountry4} /></div>
                        <div><YearDropdown id="yearDropDown" onSelectYear={setSelectedYear} /></div>
                    </div>
                );
            case '3':
                return (
                    <div>
                        <div><YearDropdown id="yearDropDown" onSelectYear={setSelectedYear} /></div>
                        <div><StatDropdown id="statDropdown" onSelectStat={setSelectedStat} /></div>
                    </div>
                );
            case '4':
                return (
                    <div>
                        <div><CountryDropdown id="countryDropdown" onSelectCountry={setSelectedCountry} /></div>
                        <div><YearDropdown id="yearDropDown" onSelectYear={setSelectedYear} /></div>
                    </div>
                );
            default:
                return null;
        }
    };

    const handleBack = () => {
        navigate('/graphs');
    };

    const handleGenerate = async () => {
        let url = '';
        try {
            if (selectedGraph === '1') {
                if (selectedCountry) {
                    GraphUrl = 'fossilconsumption'
                    url = `${serverUrl}/firstGraph?country=${selectedCountry}&graphType=${selectedGraph}`;
                } else {
                    toast.error("Select a country.");
                    return;
                }
            } else if (selectedGraph === '2') {
                if (selectedCountry && selectedYear) {
                    GraphUrl = 'sustainconsumption'
                    url = `${serverUrl}/pieChart?year=${selectedYear}&country=${selectedCountry}&graphType=${selectedGraph}`;
                    if (selectedCountry2) url += `&country=${selectedCountry2}`;
                    if (selectedCountry3) url += `&country=${selectedCountry3}`;
                    if (selectedCountry4) url += `&country=${selectedCountry4}`;
                } else {
                    if (!selectedCountry) toast.error("Select a country.");
                    if (!selectedYear) toast.error("Select a year.");
                    return;
                }
            } else if (selectedGraph === '3') {
                if (selectedYear && selectedStat) {
                    GraphUrl = 'emissionperiod'
                    url = `${serverUrl}/barGraph?stat=${selectedStat}&year=${selectedYear}&graphType=${selectedGraph}`;
                } else {
                    if (!selectedStat) toast.error("Select a stat.");
                    if (!selectedYear) toast.error("Select a year.");
                    return;
                }
            } else if (selectedGraph === '4') {
                if (selectedCountry && selectedYear) {
                    GraphUrl = 'energydemand'
                    url = `${serverUrl}/lastgraph?year=${selectedYear}&country=${selectedCountry}&graphType=${selectedGraph}`;
                } else {
                    if (!selectedCountry) toast.error("Select a country.");
                    if (!selectedYear) toast.error("Select a year.");
                    return;
                }
            } else {
                navigate('/YourGraph');
                return;
            }

            const response = await fetch(url, { method: 'GET' });

            if (response.ok) {
                toast.success("Generating graph...");
                const imageUrl = `${serverUrl}/image/${GraphUrl}.png`; 
                localStorage.setItem('GeneratedGraph', imageUrl);
                navigate('/YourGraph');
            } else {
                console.error('Failed to generate graph:', response.statusText);
                toast.error('Failed to generate graph.');
            }
        } catch (error) {
            console.error('Error:', error);
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
    );
}

export default Parameters;
