import React, { useState } from 'react';
import logo from '../Assets/logo.png';
import './medication.css';
import { ethers } from 'ethers';


function Medications({account,contract,provider}) {
  const [diseases, setDiseases] = useState('');
  const [medication, setMedication] = useState('');
  const [status, setStatus] = useState(false);

  async function addTreatment() {
    

    
    const treatment = {
      diseases: diseases,
      medication: medication,
      status: status
    };

    try {
      const tx = await contract.addTreatment(treatment);
      await tx.wait();
      alert('Treatment added successfully!');
      setDiseases('');
      setMedication('');
      setStatus(false);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }

  return (
    <div class='wrapper'>
      <div className='logo-img'>
          <img src={logo} className="Web-Logo" alt="logo" />
    </div>

      <h1>Add Treatment</h1>
      <label className='InputBox'>
        Diseases
        <input type="text" value={diseases} onChange={e => setDiseases(e.target.value)} />
      </label>
      <br />
      <label className='InputBox'>
        Medication
        <input type="text" value={medication} onChange={e => setMedication(e.target.value)} />
      </label>
      <br />
      <label className='InputBox'>
        Status
        <input type="checkbox" checked={status} onChange={e => setStatus(e.target.checked)} />
      </label>
      <br />
      <button onClick={addTreatment} className='btn'>Add Treatment</button>
    </div>
  );
}
export default Medications
