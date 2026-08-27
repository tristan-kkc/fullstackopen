import Weather from "./Weather"

const Country = ({ country, detailed, showDetailed}) => {
    if (!detailed) {
        return (
            <li>
                {country.name.common}
                <button onClick={showDetailed}>show</button>
            </li>
        )
    }

    const languages = Object.values(country.languages || {})

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital?.[0]}</p>
            <p>Area: {country.area}</p>

            <h3>Languages:</h3>
            <ul>
                {languages.map((lang) => (
                    <li key={lang}>{lang}</li>
                ))}
            </ul>

            <img 
                src={country.flags.png} 
                alt={`Flag of ${country.name.common}`} 
                style={{ width: '128px' }} 
            />

            <Weather 
            lat={country.capitalInfo.latlng[0]} 
            lon={country.capitalInfo.latlng[1]} 
            country={country.name.common} 
            />
        </div>
    )
}

export default Country