import React, { useState } from 'react';
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
    <div>
      <h1>Add Treatment</h1>
      <label>
        Diseases:
        <input type="text" value={diseases} onChange={e => setDiseases(e.target.value)} />
      </label>
      <br />
      <label>
        Medication:
        <input type="text" value={medication} onChange={e => setMedication(e.target.value)} />
      </label>
      <br />
      <label>
        Status:
        <input type="checkbox" checked={status} onChange={e => setStatus(e.target.checked)} />
      </label>
      <br />
      <button onClick={addTreatment}>Add Treatment</button>
    </div>
  );
}
export default Medications
