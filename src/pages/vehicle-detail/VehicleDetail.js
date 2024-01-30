import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './VehicleDetail.css';
import axios from 'axios';

const VehicleDetail = () => {
  const [vehicle, setVehicle] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const apiUrl = "https://localhost:7184";
  const documentApiUrl = `${apiUrl}/Documents`;

  useEffect(() => {
    getVehicleById();
  }, []);

  const getVehicleById = async () => {
    try {
      const response = await axios.get(`${apiUrl}/vehicles/${id}`);
      setVehicle(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteVehicle = async () => {
    try {
      if (window.confirm("Are you sure?")) {
        await axios.delete(`${apiUrl}/vehicles/${id}`);
        alert('Vehicle deleted successfully')
        navigate('../vehicles');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateVehicle = async () => {
    try {
      const response = await axios.put(`${apiUrl}/vehicles/${id}`, vehicle);
      if(() => updateVehicle()){
        alert("Updated successfully");
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setVehicle((prevVehicle) => ({
      ...prevVehicle,[id]: value,
    }));
  };

  const vehicleCreateBtn = () => {
    navigate('../vehicles/create');
  }

  // Document Codes

if (vehicle && vehicle.documents) {
  for (let i = 0; i < vehicle.documents.length; i++) {
      console.log(vehicle.documents[i]);
  }
} else {
  console.error("Vehicle or documents property is undefined");
}

  // Document Codes

  return (
    <div>
      <h2 className='title'>Vehicle Details</h2>

      <button className='create-new-btn' onClick={() => vehicleCreateBtn()}>New Vehicle</button>

      <div className='input-container-div'>
        <div className='input-box'>
          <label htmlFor="id" className='vehicle-details'>Id</label>
          <input type="text" id='id' value={vehicle.id || ''} placeholder='Enter Id' onChange={handleInputChange}/>
        </div>
        <div className='input-box'>
          <label htmlFor="model" className='vehicle-details'>Model</label>
          <input type="text" id='model' value={vehicle.model || ''} placeholder='Enter Model' onChange={handleInputChange}/>
        </div>
        <div className='input-box'>
          <label htmlFor="number" className='vehicle-details'>Number</label>
          <input type="text" id='number' value={vehicle.number || ''} placeholder='Enter Number' onChange={handleInputChange}/>
        </div>
        <div className='input-box'>
          <label htmlFor="type" className='vehicle-details'>Type</label>
          <input type="text" id='type' value={vehicle.type || ''} placeholder='Enter Type' onChange={handleInputChange}/>
        </div>
        {/* {vehicle && vehicle.documents && (
          <>
            <div className='input-box'>
              <label for="led">Lisence Expiry</label>
              <input type="date" id='led' value={new Date(vehicle.documents[0].expiryDate).toISOString().split('T')[0]} placeholder='Enter Lisence Expiry Date' />
            </div>  
            <div className='input-box'>
              <label for="ied">Insurance Expiry</label>
              <input type="date" id='ied' value={new Date(vehicle.documents[1].expiryDate).toISOString().split('T')[0]} placeholder='Enter Insurance Expiry Date' />
            </div>
            <div className='input-box'>
              <label for="eed">Emission Expiry</label>
              <input type="date" id='eed' value={new Date(vehicle.documents[2].expiryDate).toISOString().split('T')[0]} placeholder='Enter Emission Expiry Date' />
            </div>
          </>
        )} */}
      </div>

      <div className="info-container">
        <div className='info-box'>
          <h4>Lisence Expiry</h4>
          <br />
          {/* <p>Expiry Date: {vehicle.documents[0].expiryDate}</p> */}
          <br />
          <p>Model: {vehicle.model}</p>
        </div>
        <br />
        <div className='info-box'>
          <h4>Insurance Expiry</h4>
          <br />
          <p>Model: {vehicle.model}</p>
          <br />
          {/* <p>Expiry Date: {vehicle.documents[0].expiryDate}</p> */}
        </div>
        <br />
        <div className='info-box'>
          <h4>Emission Expiry</h4>
          <br />
          {/* <p>Expiry Date: {vehicle.documents[0].expiryDate}</p> */}
          <br />
          {/* <p>Description: {vehicle.documents[0].description}</p> */}
        </div>
      </div>

      <div className="document-container-div">
        <div className='document-input-box'>
          <label htmlFor="lisenceExpiryDate" className='document-label'>Lisence Expired</label>
          <input type="text" id='lisenceExpiryDate' placeholder='Lisence Expiry' className='document-details' value={vehicle.documents && vehicle.documents.length > 0 && typeof vehicle.documents[0].isValid !== 'undefined' ? vehicle.documents[0].isValid.toString() : ''}/>
        </div>
        <div className='document-input-box'>
          <label htmlFor="insuranceExpiryDate" className='document-label'>Insurance Expired</label>
          <input type="text" id='insuranceExpiryDate' placeholder='Insurance Expiry' className='document-details' value={vehicle.documents && vehicle.documents.length > 0 && typeof vehicle.documents[0].isValid !== 'undefined' ? vehicle.documents[0].isValid.toString() : ''}/>
        </div>
        <div className='document-input-box'>
          <label htmlFor="emissionExpiryDate" className='document-label'>Emission Expired</label>
          <input type="text" id='emissionExpiryDate' placeholder='Emission Expiry' className='document-details' value={vehicle.documents && vehicle.documents.length > 0 && typeof vehicle.documents[0].isValid !== 'undefined' ? vehicle.documents[0].isValid.toString() : ''}/>
        </div>
      </div>

      <div className='btn-container'>
          <button className='update-btn' onClick={() => updateVehicle()}>Update</button>
          <button className='delete-btn' onClick={() => deleteVehicle()}>Delete</button>
      </div>
    </div>
  );
};

export default VehicleDetail;