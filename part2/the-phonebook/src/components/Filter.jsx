import { useState } from 'react'

const Filter = ({value, setValue}) => {
    const handleChange = (event) => setValue(event.target.value)
        
    return (
    <div>
        filter shown with: <input 
        value={value}
        onChange={handleChange} 
        />
    </div>
    )
}

export default Filter