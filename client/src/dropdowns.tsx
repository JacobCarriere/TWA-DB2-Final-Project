import React from 'react';

const countries = [
    "Afghanistan", "Albania", "Algeria", "American Samoa", "Angola", "Antarctica",
    "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
    "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina",
    "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso",
    "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Chad",
    "Chile", "China", "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica",
    "Cote d'Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czechia", "Czechoslovakia",
    "Democratic Republic of Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea",
    "Estonia", "Eswatini", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland",
    "France", "French Guiana", "French Polynesia", "Gabon", "Gambia", "Georgia", "Germany",
    "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala",
    "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland",
    "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan",
    "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos",
    "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Lithuania", "Luxembourg", "Macao",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Martinique", "Mauritania",
    "Mauritius", "Mexico", "Micronesia (country)", "Moldova", "Mongolia", "Montenegro", "Montserrat",
    "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
    "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue",
    "North Korea", "North Macedonia", "Northern Mariana Islands", "Norway", "Oman", "Pakistan",
    "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Helena", "Saint Kitts and Nevis",
    "Saint Lucia", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa",
    "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Serbia and Montenegro", "Seychelles",
    "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
    "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
    "Syria"
];

const years = Array.from({ length: 123 }, (_, index) => 1900 + index);
const stats = ["population", "gdp", "greenhouse_gas_emissions"];

interface CountryDropdownProps {
    id: string;
    onSelectCountry: (country: string) => void;
}

interface YearDropdownProps {
    id: string;
    onSelectYear: (year: number) => void;
}

interface StatDropdownProps {
    id: string;
    onSelectStat: (stat: string) => void;
}

const capitalize = (str: string) => {
    return str
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const CountryDropdown: React.FC<CountryDropdownProps> = ({ id, onSelectCountry }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectCountry(event.target.value);
    };

    return (
        <select id={id} onChange={handleChange} defaultValue="">
            <option value="" disabled>Select a country</option>
            {countries.map((country, index) => (
                <option key={index} value={country}>
                    {country}
                </option>
            ))}
        </select>
    );
};

export const YearDropdown: React.FC<YearDropdownProps> = ({ id, onSelectYear }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectYear(parseInt(event.target.value));
    };

    return (
        <select id={id} onChange={handleChange} defaultValue="">
            <option value="" disabled>Select a year</option>
            {years.map((year, index) => (
                <option key={index} value={year}>
                    {year}
                </option>
            ))}
        </select>
    );
};

export const StatDropdown: React.FC<StatDropdownProps> = ({ id, onSelectStat }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectStat(event.target.value);
    };

    return (
        <select id={id} onChange={handleChange} defaultValue="">
            <option value="" disabled>Select a stat</option>
            {stats.map((stat, index) => (
                <option key={index} value={stat}>
                    {capitalize(stat)}
                </option>
            ))}
        </select>
    );
};
