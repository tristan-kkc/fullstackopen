import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import Search from './components/Search'
import Country from './components/Country'

const App = () => {
    const [countries, setCountries] = useState(null)
    const [search, setSearch] = useState('')

    useEffect(() => {
        countriesService
        .getAll()
        .then(countryList => {
            setCountries(countryList)
        })
    }, [])
    
    if (!countries) return null

    const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase()))

    let content 
    
    if (countriesToShow.length > 10) {
        content = <p>Too many countries, please specify your search</p>
    } else if (countriesToShow.length === 1) {
        content = <Country country={countriesToShow[0]} detailed={true} />
    } else {
        content = countriesToShow.map(country => (
            <Country key={country.name.common} country={country} detailed={false} />
        ))
    }


    return (
        <div>
            <Search value={search} setValue={setSearch}/>
            {content}
        </div>
    )
}

export default App