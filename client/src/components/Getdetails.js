import React, { useState } from 'react';


function Getdetails({account,contract,provider}) {
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');

  const handleGetDetails = async () => {
    try {
     

      console.log(contract)

      const isPatient = await contract.isPatients(account);
      const isDoctor = await contract.isDoctors(account);

      if (isPatient) {
        const patientDetails = await contract.getPatientDetails();
        setDetails(JSON.stringify(patientDetails));
      } else if (isDoctor) {
        const doctorDetails = await contract.getDoctorDetails();
        setDetails(JSON.stringify(doctorDetails));
      } else {
        setError('You are neither a patient nor a doctor');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
    
      <button onClick={handleGetDetails}>Get Details</button>
      {error && <div>{error}</div>}
      {details && <div>{details}</div>}
    </div>
  );
}

export default Getdetails;
