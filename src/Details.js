import React, { useState } from 'react'
import './Details.css'
import Details2 from './Details2';
import Weights from './Weights';

function Details({lat, long}) {

    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [work, setWork] = useState('Mapping');
    const [category, setCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(title);
        console.log(work);
        console.log(category);
        console.log(duration);

    }

    return (
        <div className='details'>
            <h1>Fill all the requirements</h1>
            <form onSubmit={handleSubmit}>
                <label>Enter Pin Code:</label>
                {/* <input type="text"
                       required
                       value={title}
                       onChange={(e) => setTitle(e.target.value)} 

                       /> */}
                <input placeholder={lat + "  " + long} />
                <label>Select the service</label>
                <select

                       type="text"
                       required
                       value={work}
                       onChange={(e) => setWork(e.target.value)}
                
                >
                    <option value="Mapping">Mapping</option>
                    <option value="Surveillance">Surveillance</option>
                    <option value="Inspection">Inspection</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Spraying">Spraying</option>
                </select>
                <Details2 work={work} />
                <Weights work={work} />
                <label>Enter Flying Duration:</label>
                <input type="text"
                       required
                       value={duration}
                       onChange={(e) => setDuration(e.target.value)} 

                       />
                <button type="submit" >Submit</button>
            </form>
        </div>
    )
}

export default Details
