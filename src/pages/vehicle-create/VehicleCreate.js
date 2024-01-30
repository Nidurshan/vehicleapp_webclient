import React, { useState } from 'react';
import './VehicleCreate.css';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const VehicleCreate = () => {

  const [vehicle, setVehicle] = useState({
    model:'',
    number:'',
    type:''
  });
  const navigate = useNavigate();
  const apiUrl = "https://localhost:7184";

  const createVehicle = async () => {
    try {
      console.log(vehicle);
      const response = await axios.post(`${apiUrl}/vehicles`, vehicle);
      setVehicle(response.data);
      alert('New vehicle created successfully');
      navigate('../vehicles');
    } catch (error) {
      console.log(error);
      alert('Error creating new vehicle:');
    }
  };
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setVehicle((prevVehicle) => ({
      ...prevVehicle,
      [id]: value,
    }));
  };

  return (
    <div>
      <h1 className='main-title'>Create a new Vehicle</h1>
      <div className='vehicle-container'>
        <input type="text" id='model' value={vehicle.model || ''} placeholder='Enter Model' onChange={handleInputChange}/>
        <br /><br />
        <input type="text" id='number' value={vehicle.number || ''} placeholder='Enter Number' onChange={handleInputChange}/>
        <br /><br />
        <input type="text" id='type' value={vehicle.type || ''} placeholder='Enter Type' onChange={handleInputChange}/>
      </div>

      <div className='document-container'>
        <label htmlFor="">Lisence Expiry Date</label>
        <input type="text" placeholder='Enter Lisence Expiry Date'/>
        <br /><br /><br />
        <label htmlFor="">Insurance Expiry Date</label>
        <input type="text" placeholder='Enter Insurance Expiry Date'/>
        <br /><br /><br />
        <label htmlFor="">Emission Expiry Date</label>
        <input type="text" placeholder='Enter Emission Expiry Date'/>
      </div>
      <button className='create-btn' id='create-btn' onClick={() => createVehicle()}>Create</button>
    </div>
  )
}

export default VehicleCreate;
